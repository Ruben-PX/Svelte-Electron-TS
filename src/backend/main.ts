/* eslint-disable @typescript-eslint/no-var-requires */

import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    frame: true,
    titleBarStyle: "hidden",
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(app.getAppPath(), "public", "index.html"));
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Hot reloading
try {
  require("electron-reloader")(module);
} catch (_) {}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("PING", (e) => {
  console.log("PING RECIVED");
  e.sender.send("PONG");
});
