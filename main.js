'use strict'

// pulled from electron builder

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const isDevelopment = (process.env.NODE_ENV || '').trim() === 'dev';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
    const window = new BrowserWindow({width: 1920, height: 1080});

    if (!isDevelopment) {
        window.setFullScreen(true);
        window.setMenu(null);
    }

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'public', 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    window.on('closed', () => {
        mainWindow = null
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus()
        })
    });

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
});