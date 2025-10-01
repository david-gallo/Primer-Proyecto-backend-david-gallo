const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

router.post('/', async (req, res) => {
    const nuevoCarrito = await CartManager.crearCarrito();
    res.status(201).json(nuevoCarrito);
});

router.get('/:cid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const carrito = await CartManager.obtenerCarritoPorId(carritoId);
    if (carrito) {
        res.json(carrito.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    const cantidad = req.body && req.body.quantity ? req.body.quantity : 1;

    const carritoActualizado = await CartManager.agregarProducto(carritoId, productoId, cantidad);
    if (carritoActualizado) {
        res.json(carritoActualizado);
    } else {
        res.status(404).json({ error: "Carrito o producto no encontrado" });
    }
})

module.exports = router;