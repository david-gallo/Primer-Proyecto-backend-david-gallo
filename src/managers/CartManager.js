const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartManager {
  async leerCarritos() {
    return Cart.find().populate('products.product').lean();
  }

  async crearCarrito() {
    const nuevo = await Cart.create({ products: [] });
    return nuevo.toObject();
  }

  async obtenerCarritoPorId(id) {
    return Cart.findById(id).populate('products.product').lean();
  }

  async agregarProducto(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;
    const product = await Product.findById(productId);
    if (!product) return null;

    const existing = cart.products.find(p => p.product.equals(productId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    const populated = await cart.populate('products.product');
    return populated.toObject();
  }
}

module.exports = new CartManager();
