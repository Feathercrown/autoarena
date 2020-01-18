console.log("Starting Server");
var WebSocket = require('ws');

var mainInt = 0;
var server = {
	socket:new WebSocket.Server({
        port:80
    }),
    clients: new Map()
};

server.socket.on("connection",(client,request)=>{
    //Register client
    var id = request.headers['sec-websocket-key'];
    console.log("Connection made; key/id: "+id);
    server.clients.set(id,client);

    client.on("message",(msg)=>{
        console.log(id,msg);
        var parsedMsg = JSON.parse(msg);
        recieveMessage(id, server.clients.get(id), parsedMsg.type, parsedMsg.data);
    });
});

function recieveMessage(clientId, client, msgType, data){
    /**nintendo**/ switch(msgType){ // *Delphino Plaza intensifies*
        case "init1":
            //Code goes here
            break;
        default:
            console.log("Invalid message type recieved");
            break;
    }
}