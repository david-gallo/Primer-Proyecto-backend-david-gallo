const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

router.post('/', async (req, res, next) => {
    try {
        const nuevoCarrito = await CartManager.crearCarrito();
        res.status(201).json(nuevoCarrito);
    } catch (err) { next(err); }
});

router.get('/:cid',
    param('cid').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('cid debe ser un ObjectId válido'),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const carrito = await CartManager.obtenerCarritoPorId(req.params.cid);
        if (carrito) res.json(carrito.products);
        else res.status(404).json({ error: "Carrito no encontrado" });
    } catch (err) { next(err); }
});

router.post('/:cid/product/:pid',
    [
        param('cid').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('cid debe ser ObjectId válido'),
        param('pid').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('pid debe ser ObjectId válido'),
        body('quantity').optional().isInt({ gt: 0 }).withMessage('quantity debe ser entero positivo')
    ],
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const cantidad = req.body && req.body.quantity ? Number(req.body.quantity) : 1;

    const carritoActualizado = await CartManager.agregarProducto(carritoId, productoId, cantidad);
        if (carritoActualizado) res.json(carritoActualizado);
        else res.status(404).json({ error: "Carrito o producto no encontrado" });
    } catch (err) { next(err); }
});

module.exports = router;