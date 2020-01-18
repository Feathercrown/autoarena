// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var config = {
    serverUrl: "ws://localhost:80", //TODO: Make this configurable for the end user via in-app text input
    mapSize: 33 //TODO: Make this get map size from server instead of defining it here in client
};

// Initialization
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var socket = new WebSocket(config.serverUrl);

var game = {
    state:{
        board: (()=>{new Array(config.mapSize).fill(new Array(config.mapSize).fill(new Tile()))})(), // Create a 2d array based on config value
        scores: [0,0,0,0] // Rudimentary defaults
    },
    send: function(msgType, data){
        socket.send(JSON.stringify({type:msgType, data:data}));
    },
    recieve: function(msgType, data){
        console.log(msgType);
        console.log(data);
    }
};

//Socket connection handling
socket.onerror = function(){alert("ERROR");};
socket.onclose = function(){alert("SOCKET CLOSED");};
socket.onmessage = function(payload){
    var msg = JSON.parse(payload);
    game.recieve(msg.type, msg.data);
};
socket.onopen = function(){
    console.log("Connecting to server");
    game.send("init",{stage:0});
};