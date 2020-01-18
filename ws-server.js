console.log("Starting Server");
var WebSocket = require('ws');

var mainInt = 0;
var server = {
	socket:new WebSocket.Server({
        port:80
    }),
    clientIDs:[],
    clients:{}
};
server.socket.on("connection",(client,request)=>{
    //Register client
    var id = request.headers['sec-websocket-key'];
    console.log("Connection made; key/id: "+id);
    server.clientIDs.push(id);
    server.clients[id]=client;

    client.on("message",(msg)=>{
        recieveMessage(id,msg);
    });
});

function recieveMessage(id,msg){
    console.log(id,msg);
    var msg = JSON.parse(msg);
    var client = server.clients[id];
}