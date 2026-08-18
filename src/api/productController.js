const express = require('express');
const router = express.Router();
const Product = require('../domain/Product');

// Rota para cadastrar produto
router.post('/register', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar produto', message: error.message });
  }
});

// Rota para listar todos os produtos (O professor vai querer ver isso)
router.get('/all', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

module.exports = router;
