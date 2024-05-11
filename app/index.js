
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json');

// Importe o modelo Personagem aqui
const Personagem = require('./models/personagem');
const app = express();
app.use(express.json());

// Configuração do Sequelize
const sequelize = new Sequelize(config.development);

// Define a rota para criar um novo personagem
app.post('/personagens', async (req, res) => {
  try {
    const { nome, id_jogador } = req.body;
    const personagem = await Personagem.create({ nome, id_jogador });
    res.status(201).json(personagem);
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem' });
  }
});

// Define a rota para listar todos os personagens
app.get('/personagens', async (req, res) => {
  try {
    const personagens = await Personagem.findAll();
    res.json(personagens);
  } catch (error) {
    console.error('Erro ao listar personagens:', error);
    res.status(500).json({ error: 'Erro ao listar personagens' });
  }
});

// Define a rota para buscar um personagem por ID
app.get('/personagens/:id', async (req, res) => {
  try {
    const personagem = await Personagem.findByPk(req.params.id);
    if (!personagem) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    res.json(personagem);
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    res.status(500).json({ error: 'Erro ao buscar personagem' });
  }
});

// Define a rota para atualizar um personagem por ID
app.put('/personagens/:id', async (req, res) => {
  try {
    const { nome, id_jogador } = req.body;
    const personagem = await Personagem.findByPk(req.params.id);
    if (!personagem) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    await personagem.update({ nome, id_jogador });
    res.json(personagem);
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar personagem' });
  }
});

// Define a rota para deletar um personagem por ID
app.delete('/personagens/:id', async (req, res) => {
  try {
    const personagem = await Personagem.findByPk(req.params.id);
    if (!personagem) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    await personagem.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar personagem:', error);
    res.status(500).json({ error: 'Erro ao deletar personagem' });
  }
});

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
