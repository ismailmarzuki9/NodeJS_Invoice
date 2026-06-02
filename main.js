// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const http = require('http');

// const expressApp = require('./app');

// let server;

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1000,
//     height: 900,
//     icon: path.join(__dirname, 'public/img/icon.png') // 👈 icon disini
//   });

//   // load dari server lokal kamu
//   win.loadURL('http://localhost:4000');

//   // optional: buka devtools biar kelihatan error
//   // win.webContents.openDevTools();
// }

// app.whenReady().then(() => {
//   // jalankan server express dari e;ectron
//   server = http.createServer(expressApp);

//   server.listen(4000, () =>{
//     console.log('Server auto run')
//     createWindow();
//   });
// });

// // tutup server saat aplikasi di tutup
// app.on('window-all-closed', () => {
//   if (server) server.close();
//   app.quit();
// });

