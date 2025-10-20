const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../src/models/Product');
const ProductManager = require('../src/managers/ProductManager');

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
});

test('crear y leer producto', async () => {
  const data = { title: 'test', price: 10 };
  const creado = await ProductManager.agregarProducto(data);
  expect(creado).toHaveProperty('id');

  const lista = await ProductManager.leerProductos();
  expect(Array.isArray(lista)).toBe(true);
  expect(lista.length).toBe(1);
});

test('actualizar producto', async () => {
  const creado = await ProductManager.agregarProducto({ title: 'uno', price: 5 });
  const actualizado = await ProductManager.actualizarProducto(creado.id, { price: 7 });
  expect(actualizado.price).toBe(7);
});

test('eliminar producto', async () => {
  const creado = await ProductManager.agregarProducto({ title: 'del', price: 1 });
  const eliminado = await ProductManager.eliminarProducto(creado.id);
  expect(eliminado).toBe(true);
});
