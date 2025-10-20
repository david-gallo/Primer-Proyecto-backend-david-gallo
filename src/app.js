const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const viewRoutes = require('./routes/viewRoutes');
const { connectDB } = require('./db');
const app = express();
const mongoose = require('mongoose');
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('io', io);

connectDB().catch(err => console.error('DB connection error', err));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewRoutes);

io.on('connection', (socket) => {
  socket.on('newProduct', async (data) => {
    try {
      const ProductManager = require('./managers/ProductManager');
      await ProductManager.agregarProducto(data);
      const productos = await ProductManager.leerProductos();
      io.emit('productsUpdated', productos);
    } catch (err) {
      console.error('Socket newProduct error:', err);
      socket.emit('error', { message: err.message });
    }
  });

  socket.on('deleteProduct', async (id) => {
    try {
      const ProductManager = require('./managers/ProductManager');
      if (!mongoose.Types.ObjectId.isValid(id)) {
        socket.emit('error', { message: 'Invalid product id' });
        return;
      }
      await ProductManager.eliminarProducto(id);
      const productos = await ProductManager.leerProductos();
      io.emit('productsUpdated', productos);
    } catch (err) {
      console.error('Socket deleteProduct error:', err);
      socket.emit('error', { message: err.message });
    }
  });
});
const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Server en http://localhost:${PORT}`));

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});