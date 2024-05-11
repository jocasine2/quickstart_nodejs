const express = require('express');
const app = express();[]

// Use os controladores para registrar as rotas
app.use('/users', require('./controllers/auth_controller'));

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});