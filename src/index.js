const { createWindow } = require('./main');
const { getConnection } = require('./database');

const { app } = require('electron');
require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);