const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// Keep a global reference to prevent garbage collection
let mainWindow;

// ─── In-App Updater ────────────────────────────────────────────────────────
// Downloads APTestPrep.zip from GitHub, extracts it, strips quarantine,
// replaces the running .app bundle on disk, then relaunches.
ipcMain.on('install-update', (event, assetUrl) => {
  const send = (msg) => {
    try { event.sender.send('update-progress', msg); } catch (e) {}
  };

  const tmpDir = os.tmpdir();
  const zipPath = path.join(tmpDir, 'APTestPrep_update.zip');
  const extractDir = path.join(tmpDir, 'APTestPrep_update');

  try {
    // 1. Download — curl handles GitHub's redirects natively
    send('Downloading...');
    execSync(`curl -L -o "${zipPath}" "${assetUrl}"`, { stdio: 'pipe' });

    // 2. Extract
    send('Extracting...');
    execSync(`rm -rf "${extractDir}" && unzip -o "${zipPath}" -d "${extractDir}"`, { stdio: 'pipe' });

    // 3. Remove quarantine (same fix as the Open AP Test Prep.command launcher)
    send('Installing...');
    execSync(`xattr -cr "${extractDir}/AP Test Prep.app"`, { stdio: 'pipe' });

    // 4. Locate the running .app bundle
    //    app.getPath('exe') → /…/AP Test Prep.app/Contents/MacOS/AP Test Prep
    const exePath = app.getPath('exe');
    const dotAppIndex = exePath.indexOf('.app/');
    if (dotAppIndex === -1) throw new Error('Could not locate .app bundle path');
    const appPath = exePath.substring(0, dotAppIndex + 5); // e.g. /path/AP Test Prep.app

    // 5. Replace old app with new one
    execSync(`rm -rf "${appPath}"`, { stdio: 'pipe' });
    execSync(`cp -r "${extractDir}/AP Test Prep.app" "${appPath}"`, { stdio: 'pipe' });

    // 6. Clean up temp files
    execSync(`rm -f "${zipPath}" && rm -rf "${extractDir}"`, { stdio: 'pipe' });

    // 7. Relaunch into the updated app
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
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 15, y: 15 },
    backgroundColor: '#f8f9fa',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the main HTML file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Route window.open() calls (e.g. the update "Download →" fallback link)
  // to the system browser instead of a new Electron window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Add macOS class so CSS can offset the navbar past traffic lights
  if (process.platform === 'darwin') {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.executeJavaScript(
        'document.documentElement.classList.add("macos")'
      );
    });
  }

  // Build a simple menu bar
  const menuTemplate = [
    {
      label: 'AP Test Prep',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
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
        { type: 'separator' },
        { role: 'front' }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

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
