const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user'); // Importe o modelo de usuário aqui
const Person = require('../models/person'); // Importe o modelo de pessoa aqui

// Função para gerar o token JWT
const generateToken = (userId, username) => {
  return jwt.sign(
    {
      userId,
      username
    },
    process.env.JWT_SECRET, // Use a chave secreta para assinar o token
    { expiresIn: '1h' } // Define o tempo de expiração do token
  );
};

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
    const user = await User.create({ username, password: hashedPassword, person_id: person.id });

    res.status(201).json({ message: 'Usuário e pessoa registrados com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário e pessoa:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário e pessoa' });
  }
});

// Rota para fazer login e retornar um token JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Encontre o usuário pelo nome de usuário
    const user = await User.findOne({ where: { username } });

    // Se o usuário não existir, retorne erro
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifique se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Crie um token JWT com informações do usuário usando a função generateToken
    const token = generateToken(user.id, user.username);
  
    // Retorne o token JWT
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Rota para recuperar a senha (implementação básica, pode ser expandida conforme necessário)
router.post('/forgot-password', async (req, res) => {
  try {
    const { username } = req.body;

    // Encontre o usuário pelo nome de usuário
    const user = await User.findOne({ where: { username } });

    // Se o usuário não existir, retorne erro
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Aqui você pode implementar a lógica para recuperar a senha, como enviar um e-mail com um link para redefinição de senha

    res.status(200).json({ message: 'Um e-mail para redefinição de senha foi enviado, se o usuário existir' });
  } catch (error) {
    console.error('Erro ao recuperar senha:', error);
    res.status(500).json({ error: 'Erro ao recuperar senha' });
  }
});

module.exports = router;