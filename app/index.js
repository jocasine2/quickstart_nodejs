
const express = require('express');
const app = express();

// Middleware para fazer o parse do corpo das requisições JSON
app.use(express.json());

// Use os controladores para registrar as rotas
app.use('/personagens', require('./controllers/personagem_controller'));

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
