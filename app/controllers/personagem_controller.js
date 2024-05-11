const express = require('express');
const router = express.Router();
const Personagem = require('../models/personagem');

// Rota para criar um novo personagem
router.post('/', async (req, res) => {
  try {
    const { nome, id_jogador } = req.body;
    const personagem = await Personagem.create({ nome, id_jogador });
    res.status(201).json(personagem);
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem' });
  }
});

// Rota para listar todos os personagens
router.get('/', async (req, res) => {
  try {
    const personagens = await Personagem.findAll();
    res.json(personagens);
  } catch (error) {
    console.error('Erro ao listar personagens:', error);
    res.status(500).json({ error: 'Erro ao listar personagens' });
  }
});

// Rota para buscar um personagem por ID
router.get('/:id', async (req, res) => {
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

// Rota para atualizar um personagem por ID
router.put('/:id', async (req, res) => {
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

// Rota para deletar um personagem por ID
router.delete('/:id', async (req, res) => {
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

module.exports = router;
