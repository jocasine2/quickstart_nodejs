const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Configurando o cliente Redis
const redisClient = redis.createClient({
  host: 'redis', // Nome do serviço do Redis no Docker Compose
  port: 6379, // Porta padrão do Redis
});

// Middleware para registrar novos assinantes
app.post('/subscribe/:channel', (req, res) => {
  const { channel } = req.params;

  // Configurar um novo assinante para o canal especificado
  redisClient.subscribe(channel, (err) => {
    if (err) {
      res.status(500).send('Erro ao se inscrever no canal.');
    } else {
      res.status(200).send(`Inscrito no canal: ${channel}`);
    }
  });
});

// Rota para publicar uma mensagem em um canal
app.post('/publish/:channel', (req, res) => {
  const { channel } = req.params;
  const { message } = req.body;

  // Publicar a mensagem no canal especificado
  redisClient.publish(channel, message);

  res.status(200).send(`Mensagem publicada no canal: ${channel}`);
});

// Iniciar o servidor Express
app.listen(port, () => {
  console.log(`Servidor Express iniciado na porta ${port}`);
});
