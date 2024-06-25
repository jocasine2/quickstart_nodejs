// Importa os módulos necessários
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

// Cria uma instância do aplicativo Express
const app = express();

// Cria um servidor HTTP usando a instância do aplicativo Express
const server = http.createServer(app);

// Configura o Socket.IO para funcionar com o servidor HTTP
const io = socketIo(server);

// Objeto para armazenar os clientes conectados
const clients = {};

// Rota principal que retorna uma mensagem simples
app.get('/', (req, res) => {
  res.send('server is running');
});

// Middleware para lidar com rotas não encontradas
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(getReasonPhrase(StatusCodes.NOT_FOUND));
});

// Lida com eventos de conexão do Socket.IO
io.on("connection", (client) => {
  // Evento "join" quando um cliente se junta a uma sala
  client.on("join", (user) => {
    console.log(user);
    // Cliente entra na sala especificada
    client.join(user.id_sala);
    // Armazena o nome do cliente no objeto clients
    clients[client.id] = user.name;

    console.log("Joined: " + user.name);
    // Envia uma mensagem de atualização para o cliente
    client.emit("update", '${name}, você está conectado ao servidor na sala ${id_sala}');

    
    // Envia uma mensagem de atualização para todos os outros clientes na sala
    client.broadcast.to(user.id_sala).emit("update", '${name} entrou na mesa.');
  });

  // Evento "send" quando um cliente envia uma mensagem
  client.on("send", (user, msg) => {
    // console.log(user);
    // console.log(msg);
    // Envia a mensagem para todos os outros clientes na sala
    client.broadcast.to(user.id_sala).emit("chat", user, msg);
  });

  // Evento "disconnect" quando um cliente se desconecta
  client.on("disconnect", () => {
    console.log("Disconnect");
    if (clients[client.id]) {
      // Envia uma mensagem de atualização informando que o cliente saiu
      io.emit("update", '${clients[client.id]} saiu da mesa.');
    }
    // Remove o cliente do objeto clients
    delete clients[client.id];
  });
});

// Define a porta em que o servidor vai escutar
const PORT = 3000;

// Inicia o servidor e escuta na porta definida
server.listen(PORT, () => {
  console.log('listening on port ${PORT}');
});
