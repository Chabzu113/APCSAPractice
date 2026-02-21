// Preload script — runs before the web page loads
// Exposes controlled Node/Electron APIs to the renderer via contextBridge

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Trigger the download-and-install update in the main process
  installUpdate: (assetUrl) => ipcRenderer.send('install-update', assetUrl),
  // Listen for progress messages from the main process during update
  onUpdateProgress: (callback) => ipcRenderer.on('update-progress', (_e, msg) => callback(msg))
});
