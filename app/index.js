const express = require('express');
const app = express();

// Middleware para fazer o parse do corpo das requisições JSON
app.use(express.json());

// Use os controladores para registrar as rotas
app.use('/users', require('./controllers/auth_controller'));

app.get('/', (req, res) => {
  const PORT = process.env.PORT || 3000;
  res.send(`Servidor está rodando na porta ${PORT}`);
});

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});