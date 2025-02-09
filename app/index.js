const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS para todas as origens
app.use(cors());

// Middleware para fazer o parse do corpo das requisições JSON
app.use(express.json());

// Middleware para logar todas as requisições recebidas e seus parâmetros
app.use((req, res, next) => {
  console.log(`[REQUISIÇÃO] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log(`[PARAMETROS]`, req.body);
  }
  next();
});

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
