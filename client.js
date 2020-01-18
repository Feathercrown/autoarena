// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var config = {
    serverUrl: "ws://localhost:80", //TODO: Make this configurable for the end user via in-app text input
    client: {
        name: "Default Dave",
        color: "#FF0000",
        teamNumber: -1
    },
    game: {
        //Defaults, overwritten by server during init phase
        mapSize: 33
    }
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
    send: function(msgType, msgData){
        socket.send(JSON.stringify({type:msgType,data:msgData}));
    },
    recieve: recieveMessage
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
    //Begin initialization phase by sending over client data
    game.send("init1",config.client);
};

//Main code-- handle server events
function recieveMessage(msgType, data){
    console.log(msgType);
    console.log(data);
    switch(msgType){
        case "init2":
            config.client.teamNumber = data;
            game.send("init3");
            break;
        default:
            alert("ERROR: Recived unknown message type from server");
            break;
    }
}