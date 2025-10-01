const fs = require('fs');
const path = require('path');
const ProductManager = require("./ProductManager");

class CartManager {

    static path = path.join(__dirname, '../data/carts.json');

    static async leerCarritos(){
           try {
             let carritos = await fs.promises.readFile(this.path, "utf-8");
               return JSON.parse(carritos);
           }
           catch (error){
               return [];
           }

    }
    static async crearCarrito() {
        const carritos = await this.leerCarritos();
        const autoID = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1;
        const nuevoCarrito = { id: autoID, products: [] };
        carritos.push(nuevoCarrito);
        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2));
        return nuevoCarrito;
    }

    static async obtenerCarritoPorId(carritoId) {
    const carritos = await this.leerCarritos();
    return carritos.find(c => c.id == carritoId) || null;
    }   

    static async agregarProducto(carritoId, productoId, cantidad = 1) {
        const carritos = await this.leerCarritos();
        const productos = await ProductManager.leerProductos(); 
        const carrito = carritos.find(c => c.id == carritoId)
        if(!carrito) return null;
        
        const producto = productos.find(p => p.id == productoId);
        if(!producto) return null;

        const productoEnCarrito = carrito.products.find(p => p.product == productoId)
        if(productoEnCarrito) {
            productoEnCarrito.quantity += cantidad;
        }
        else {
            carrito.products.push({ product: productoId, quantity: cantidad});
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2));
        return carrito;
    }


}
module.exports = CartManager;
