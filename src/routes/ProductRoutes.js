const express = require('express');
const router = express.Router();
const ProductManager = require("../managers/ProductManager");
const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

router.get("/", async (req, res, next) => {
    try {
        const { page, limit, sort, category, q } = req.query;
        if (page || limit || sort || category || q) {
            const result = await ProductManager.leerProductosPaginated({ page, limit, sort, category, q });
            return res.json(result);
        }
        const productos = await ProductManager.leerProductos();
        res.json(productos);
    } catch (err) { next(err); }
});

router.get("/:pid",
    param('pid').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('pid debe ser un ObjectId válido'),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const producto = await ProductManager.leerProductoPorId(req.params.pid);
        if (producto) res.json(producto);
        else res.status(404).json({ error: "Producto no encontrado" });
    } catch (err) { next(err); }
});

router.post("/",
    [
        body('title').exists().withMessage('title es obligatorio').isString(),
        body('price').exists().withMessage('price es obligatorio').isNumeric(),
        body('stock').optional().isInt({ min: 0 }),
        body('status').optional().isBoolean(),
        body('thumbnails').optional().isArray()
    ],
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const nuevo = await ProductManager.agregarProducto(req.body);
        const io = req.app.get('io');
        const productos = await ProductManager.leerProductos();
        if (io) io.emit('productsUpdated', productos);
        res.status(201).json(nuevo);
    } catch (err) { next(err); }
});

router.put("/:pid",
    [
        param('pid').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('pid debe ser un ObjectId válido'),
        body('title').optional().isString(),
        body('price').optional().isNumeric(),
        body('stock').optional().isInt({ min: 0 }),
        body('status').optional().isBoolean()
    ],
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const productoActualizado = await ProductManager.actualizarProducto(req.params.pid, req.body);
        if (productoActualizado) {
            const io = req.app.get('io');
            const productos = await ProductManager.leerProductos();
            if (io) io.emit('productsUpdated', productos);
            res.json(productoActualizado);
        } else res.status(404).json({ error: "Producto no encontrado" });
    } catch (err) { next(err); }
});

router.delete("/:pid",
    param('pid').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('pid debe ser un ObjectId válido'),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const eliminado = await ProductManager.eliminarProducto(req.params.pid);
        const io = req.app.get('io');
        const productos = await ProductManager.leerProductos();
        if (io) io.emit('productsUpdated', productos);
        if (eliminado) res.json({ mensaje: "Producto eliminado correctamente" });
        else res.status(404).json({ error: "Producto no encontrado" });
    } catch (err) { next(err); }
});


module.exports= router;