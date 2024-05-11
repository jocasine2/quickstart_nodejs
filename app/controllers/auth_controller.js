const express = require('express');
const router = express.Router();

const User = require('../models/user'); // Importe o modelo de usuário aqui
const Person = require('../models/person'); // Importe o modelo de pessoa aqui

// Rota para registrar uma nova pessoa e seu usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // Verifique se o usuário já existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário já está em uso' });
    }

    // Crie a pessoa
    const person = await Person.create({ name });

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie o usuário associado à pessoa
    const user = await User.create({ username, password: hashedPassword, personId: person.id });

    res.status(201).json({ message: 'Usuário e pessoa registrados com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário e pessoa:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário e pessoa' });
  }
});

module.exports = router;