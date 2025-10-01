const express = require('express');
const router = express.Router();
const ProductManager = require("../managers/ProductManager");
const fs = require('fs');
const path = require('path');


router.get("/", async (req, res) => {
    const productos = await ProductManager.leerProductos()
    res.json(productos); 
});

router.get("/:pid", async (req, res) => {
    const productos = await ProductManager.leerProductos()
    const producto = productos.find (p => p.id == req.params.pid);
    if (producto){
        res.json(producto);
    }
    else {
        res.status(404).json({error: "Producto no encontrado" });

    }
})

router.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoProducto = await ProductManager.agregarProducto(req.body);
    res.status(201).json(nuevoProducto);
})
router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const datosActualizados = req.body;
    const productoActualizado = await ProductManager.actualizarProducto(id, datosActualizados);
    if (productoActualizado) {
        res.json(productoActualizado);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
})
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    const eliminado = await ProductManager.eliminarProducto(id);
    if (eliminado) {
        res.json({ mensaje: "Producto eliminado correctamente" });
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
})



module.exports= router;