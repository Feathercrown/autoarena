// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var config = {
    serverUrl: "ws://localhost:80"
};

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

console.log("debug");

var socket = new WebSocket(config.serverUrl);

// Socket connection handling
socket.onerror = function(){
    alert("ERROR");
};
socket.onclose = function(){
    alert("SOCKET CLOSED");
};
socket.onopen = function(){
    console.log("Open");
    socket.send('{"message":"test from client"}'); // TX
};

//Actual good stuff
socket.onmessage = function(payload){ // RX
    console.log("Message:\n");
    console.log(payload);
};
