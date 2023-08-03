const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handler for the "navigate-to-site" event
ipcMain.handle('navigate-to-site', async (event, url) => {
  const axios = require('axios');

  try {
    const response = await axios.get(url, {
        headers: {
         Authorization: ''});

    // Assuming the response contains the site contents data
    const siteContents = response.data;

    return siteContents;
  } catch (error) {
    console.error('Error fetching data from SharePoint:', error.message);
    throw error;
  }
});
