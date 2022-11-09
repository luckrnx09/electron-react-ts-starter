import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  MessageBoxOptions,
} from 'electron';
import path from 'path';

app.on("ready", () => {
    let win: BrowserWindow | null = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
  
    if (process.env.NODE_ENV === "development") {
      win.loadURL(`http://localhost:${process.env.port}`);
      win.webContents.openDevTools();
    } else {
      win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
      win.webContents.openDevTools();
    }
  
  
    ipcMain.handle("showMessageBox", async (event, options: MessageBoxOptions) => {
      if (!win) {
        return Promise.reject('window has closed');
      }
      return await dialog.showMessageBox(win, options);
    });
  
    win.on("closed", () => {
      win = null;
    });
  });
  