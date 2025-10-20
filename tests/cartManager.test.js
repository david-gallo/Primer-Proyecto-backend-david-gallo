const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../src/models/Product');
const Cart = require('../src/models/Cart');
const ProductManager = require('../src/managers/ProductManager');
const CartManager = require('../src/managers/CartManager');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany({});
  await Cart.deleteMany({});
});

test('crear carrito y agregar producto', async () => {
  const producto = await ProductManager.agregarProducto({ title: 'p1', price: 10 });
  const carrito = await CartManager.crearCarrito();
  const actualizado = await CartManager.agregarProducto(carrito._id.toString(), producto.id, 2);
  expect(actualizado.products.length).toBe(1);
  const updatedProductExists = !!actualizado.products.find(p => p.product._id.toString() === producto.id);
  expect(updatedProductExists).toBe(true);
});

test('agregar producto inexistente devuelve null', async () => {
  const carrito = await CartManager.crearCarrito();
  const res = await CartManager.agregarProducto(carrito._id.toString(), new mongoose.Types.ObjectId().toString(), 1);
  expect(res).toBeNull();
});
