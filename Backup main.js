const { app, BrowserWindow } = require('electron');
const path = require('path');

// 🔥 Jalankan express di sini
require('./app');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'public/img/icon.png') // 👈 icon disini
  });

  // load dari server lokal kamu
  win.loadURL('http://localhost:4000');

  // optional: buka devtools biar kelihatan error
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});