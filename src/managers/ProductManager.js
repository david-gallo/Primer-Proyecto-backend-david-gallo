const Product = require('../models/Product');

class ProductManager {
  async leerProductos() {
    return Product.find().lean({ virtuals: true });
  }

  async leerProductosPaginated(options = {}) {
    const page = Number(options.page) > 0 ? Number(options.page) : 1;
    const limit = Number(options.limit) > 0 ? Number(options.limit) : 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (options.category) filter.category = options.category;
    if (options.q) filter.$or = [
      { title: { $regex: options.q, $options: 'i' } },
      { description: { $regex: options.q, $options: 'i' } }
    ];

    const sortObj = {};
    if (options.sort) {
      const parts = options.sort.split('_');
      if (parts.length === 2) {
        const [field, dir] = parts;
        sortObj[field] = dir === 'desc' ? -1 : 1;
      }
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean({ virtuals: true });
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return { products, total, totalPages, page, limit };
  }

  async leerProductoPorId(id) {
    return Product.findById(id).lean({ virtuals: true });
  }

  async agregarProducto(product) {
    const nuevo = await Product.create(product);
    return nuevo.toObject({ virtuals: true });
  }

  async actualizarProducto(id, cambios) {
    const actualizado = await Product.findByIdAndUpdate(id, cambios, { new: true }).lean({ virtuals: true });
    return actualizado;
  }

  async eliminarProducto(id) {
    const res = await Product.findByIdAndDelete(id);
    return !!res;
  }
}

module.exports = new ProductManager();
