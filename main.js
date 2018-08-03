const {app, BrowserWindow, ipcMain} = require('electron');
const child = require('child_process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
var win;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  
  win = mainWindow.webContents;

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

global.displayArray = [];
displayAdd = function(str){
  global.displayArray.unshift("<br>");
  global.displayArray.unshift(str);
  var displayLength = global.displayArray.length;
  win.send('message', 'display');
  if (displayLength > 20){
  global.displayArray.splice(20, 2);
  }
};

ipcMain.on('command', function (event, msg) {
  //console.log("got " + msg);
  if (msg == "start") {startInterface();}
  if (msg == "stop") {stopInterface();}
  
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})
var interface;

startInterface = function(){
  //console.log("starting");
  displayAdd("starting...");
  interface = child.spawn('node', ['TAPInterface/index.js'],{});
  interface.stderr.on('data', (data) => {
     displayAdd(data);
     stopInterface();
     });
  interface.stdout.on('data', function(data) {
    displayAdd(data);
    });
};

stopInterface = function(){
  displayAdd("stopping...");
  interface.kill('SIGINT');
};