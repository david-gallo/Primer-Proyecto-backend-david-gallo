const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

router.get('/', async (req, res) => {
  const productos = await ProductManager.leerProductos();
  res.render('home', { productos });
});

router.get('/realtimeproducts', async (req, res) => {
  const productos = await ProductManager.leerProductos();
  res.render('realTimeProducts', { productos });
});

module.exports = router;