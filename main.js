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

ipcMain.handle('get-contents', async (event, url) => {
    const axios = require('axios');
  
    try {
        const response = await axios.get(url, {
            headers: {
             Authorization: ''
            }});
  
      // Assuming the response contains the list of contents data
      const contents = response.data.value;
  
      return contents;
    } catch (error) {
      console.error('Error fetching contents from SharePoint:', error.message);
      throw error;
    }
  });
