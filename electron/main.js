const { app, BrowserWindow, Menu, shell, ipcMain, session } = require('electron');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const crypto = require('crypto');
const path = require('path');
const os = require('os');
const fs = require('fs');

const isMac = process.platform === 'darwin';

// ─── Trusted domains for update downloads ─────────────────────────────────
const ALLOWED_UPDATE_DOMAINS = [
  'github.com',
  'objects.githubusercontent.com',
  'releases.githubusercontent.com'
];

// ─── In-App Updater ────────────────────────────────────────────────────────
// Downloads the platform-specific installer from GitHub, verifies SHA-256.
// macOS: extracts ZIP, strips quarantine, replaces .app bundle, relaunches.
// Windows: runs NSIS installer silently (/S), which replaces files and relaunches.
ipcMain.on('install-update', async (event, assetUrl) => {
  const send = (msg) => {
    try { event.sender.send('update-progress', msg); } catch (e) {}
  };

  // ── Security: validate download domain ──────────────────────────────────
  try {
    const urlHost = new URL(assetUrl).hostname;
    if (!ALLOWED_UPDATE_DOMAINS.some(d => urlHost === d || urlHost.endsWith('.' + d))) {
      send(`Update blocked: untrusted source (${urlHost})`);
      return;
    }
  } catch (e) {
    send('Update blocked: invalid download URL');
    return;
  }

  const tmpDir = os.tmpdir();
  const checksumPath = path.join(tmpDir, 'APTestPrep_checksums.txt');

  // ── Shared helper: download & verify SHA-256 checksum ─────────────────
  async function downloadAndVerify(downloadPath, assetName) {
    // 1. Download asset
    send('Downloading...');
    await execAsync(`curl -L -o "${downloadPath}" "${assetUrl}"`);

    // 2. Download and verify checksum (stream-based so we don't load 280 MB into RAM)
    send('Verifying...');
    const checksumUrl = assetUrl.replace(assetName, 'checksums.txt');
    try {
      await execAsync(`curl -L -o "${checksumPath}" "${checksumUrl}"`);
      const checksumsText = fs.readFileSync(checksumPath, 'utf8');
      const expectedLine  = checksumsText.split('\n').find(l => l.includes(assetName));
      const expectedHash  = expectedLine ? expectedLine.split(/\s+/)[0].trim() : null;
      if (expectedHash) {
        const actualHash = await new Promise((resolve, reject) => {
          const hash   = crypto.createHash('sha256');
          const stream = fs.createReadStream(downloadPath);
          stream.on('data',  chunk => hash.update(chunk));
          stream.on('end',   ()    => resolve(hash.digest('hex')));
          stream.on('error', reject);
        });
        if (actualHash !== expectedHash) {
          try { fs.unlinkSync(downloadPath); } catch (e) {}
          try { fs.unlinkSync(checksumPath); } catch (e) {}
          send('Update cancelled: file integrity check failed. Please try again or download manually.');
          return false;
        }
      }
    } catch (checksumErr) {
      // checksums.txt not available — proceed without verification (older releases)
    }
    return true;
  }

  // ── Windows: download NSIS installer, verify, run silently ────────────
  if (!isMac) {
    const installerPath = path.join(tmpDir, 'APTestPrep_update.exe');
    try {
      const ok = await downloadAndVerify(installerPath, 'APTestPrep-Win.exe');
      if (!ok) return;

      // Launch the NSIS installer silently (/S) — it will close the running
      // app, replace files in %LOCALAPPDATA%\ap-csa-practice, and relaunch.
      send('Installing...');
      spawn(installerPath, ['/S'], { detached: true, stdio: 'ignore' }).unref();

      // Clean up checksum file
      try { fs.unlinkSync(checksumPath); } catch (e) {}

      // Give the installer a moment to start, then quit so it can replace files
      send('Restarting...');
      setTimeout(() => app.quit(), 1500);

    } catch (err) {
      send(`Update failed: ${err.message}`);
    }
    return;
  }

  // ── macOS: download ZIP, verify, extract, replace .app, relaunch ──────
  const zipPath    = path.join(tmpDir, 'APTestPrep_update.zip');
  const extractDir = path.join(tmpDir, 'APTestPrep_update');

  try {
    const ok = await downloadAndVerify(zipPath, 'APTestPrep-Mac.zip');
    if (!ok) return;

    // 3. Extract
    send('Extracting...');
    await execAsync(`rm -rf "${extractDir}" && unzip -o "${zipPath}" -d "${extractDir}"`);

    // 4. Remove macOS quarantine
    send('Installing...');
    await execAsync(`xattr -cr "${extractDir}/AP Test Prep.app"`);

    // 5. Locate running .app bundle
    //    app.getPath('exe') → /…/AP Test Prep.app/Contents/MacOS/AP Test Prep
    const exePath     = app.getPath('exe');
    const dotAppIndex = exePath.indexOf('.app/');
    if (dotAppIndex === -1) throw new Error('Could not locate .app bundle path');
    const appPath = exePath.substring(0, dotAppIndex + 5);

    // 6. Replace old app with new one
    await execAsync(`rm -rf "${appPath}"`);
    await execAsync(`cp -r "${extractDir}/AP Test Prep.app" "${appPath}"`);

    // 7. Clean up temp files
    await execAsync(`rm -f "${zipPath}" "${checksumPath}" && rm -rf "${extractDir}"`);

    // 8. Relaunch into updated version
    send('Restarting...');
    app.relaunch();
    app.quit();

  } catch (err) {
    send(`Update failed: ${err.message}`);
  }
});

// ─── Window ────────────────────────────────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 800,
    minHeight: 600,
    title: 'AP Test Prep',
    backgroundColor: '#f8f9fa',
    // macOS-only: hidden title bar with traffic lights
    ...(isMac ? {
      titleBarStyle: 'hiddenInset',
      trafficLightPosition: { x: 15, y: 15 }
    } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Route window.open() calls to system browser (update "Download →" fallback)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Only open DevTools in development (not in packaged builds)
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // Add macOS class so CSS can offset the navbar past traffic lights
  if (isMac) {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.executeJavaScript(
        'document.documentElement.classList.add("macos")'
      );
    });
  }

  // ── Menu bar ──────────────────────────────────────────────────────────
  const menuTemplate = [
    {
      label: 'AP Test Prep',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        // macOS-only window management roles
        ...(isMac ? [
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' }
        ] : []),
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [{ type: 'separator' }, { role: 'front' }] : [])
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Keep a global reference to prevent garbage collection
let mainWindow;

// ─── Content Security Policy ───────────────────────────────────────────────
// Restricts what the renderer can load/execute. Prevents XSS even if
// malicious content were injected into question data.
app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    // Only inject our CSP on local HTML pages — NOT on external iframe content
    // (e.g. the Desmos iframe has its own CSP from desmos.com; overriding it breaks it)
    if (details.url.startsWith('file://')) {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self';" +
            "script-src 'self' https://cdn.jsdelivr.net;" +
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;" +
            "font-src 'self' https://cdn.jsdelivr.net;" +
            "img-src 'self' data:;" +
            "connect-src https://api.github.com https://objects.githubusercontent.com https://releases.githubusercontent.com;" +
            "frame-src https://www.desmos.com;" +
            "worker-src 'self' blob:;"
          ]
        }
      });
    } else {
      // Pass external responses through unchanged (preserves Desmos's own CSP)
      callback({ responseHeaders: details.responseHeaders });
    }
  });

  createWindow();
});

// Quit when all windows are closed (macOS standard behavior override)
app.on('window-all-closed', () => {
  app.quit();
});

// Re-create window if dock icon is clicked and no windows exist
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
