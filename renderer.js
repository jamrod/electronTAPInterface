const {ipcRenderer, remote} = require('electron');

function start() {
    document.getElementById("start").style.color = "green";
    document.getElementById("stop").style.color = "red";
    document.getElementById("display").innerHTML = "HI";
    displayMsg();
    ipcRenderer.send('command', 'start');
    document.getElementById("status").innerHTML = "Running";

    }
    
function stop() {
    document.getElementById("start").style.color = "LimeGreen";
    document.getElementById("stop").style.color = "DarkRed";
    ipcRenderer.send('command', 'stop');
    document.getElementById("status").innerHTML = "Stopped";

    }

displayMsg = function(){
    console.log('displayMsg called');
    displayText = remote.getGlobal('displayArray').reverse();
    displayText = displayText.join("");
    document.getElementById("display").innerHTML = displayText;//display
    };
    