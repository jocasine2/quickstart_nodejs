var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = {}; 

app.get('/', function(req, res){
  res.send('server is running');
});

io.on("connection", function (client) {
    
    client.on("join", function(name, foto, id_sala){     
        client.join(id_sala);
        clients[client.id] = name;

        console.log("Joined: " + name);
        client.emit("update", name + " Você está conectado ao servidor na sala "+id_sala);
	    client.broadcast.to(id_sala).emit("update", name + " entrou na mesa.");      
    });

    client.on("send", function(msg, foto, id_sala){
    	client.broadcast.to(id_sala).emit("chat", clients[client.id], msg, foto);
    });

    client.on("disconnect", function(){
    	    console.log("Disconnect");
            if(clients[client.id]){
                io.emit("update", clients[client.id] + " saiu da mesa.");
            }
            delete clients[client.id];
    });
    
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});