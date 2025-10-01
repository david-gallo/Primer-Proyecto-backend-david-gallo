
const fs = require('fs');
const path = require('path');

class ProductManager {

static path = path.join(__dirname, '../data/products.json');
    static async leerProductos() {
    try {
      let productos = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(productos);
    }
    catch (error){
        return [];
}}  
static async agregarProducto(productoData) {
    const productos = await this.leerProductos();
    const autoID = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    const nuevoProducto = {
        id: autoID,
        ...productoData
    };
    productos.push(nuevoProducto);
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
    return nuevoProducto;
}
static async actualizarProducto(id, datosActualizados) {
    const productos = await this.leerProductos();
    const index = productos.findIndex(p => p.id == id);
    if (index === -1) return null; 
    productos[index] = { ...productos[index], ...datosActualizados, id: productos[index].id };
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
    return productos[index];
}
static async eliminarProducto(id) {
    const productos = await this.leerProductos();
    const index = productos.findIndex(p => p.id == id);
    if (index === -1) return null; 

    productos.splice(index, 1); 
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
    return true;
}
}

module.exports = ProductManager;


