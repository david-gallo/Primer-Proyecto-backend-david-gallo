const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ProyectoCoder';

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado:', mongoURI);
  } catch (err) {
    console.error('Error conectando MongoDB:', err.message);
    process.exit(1);
  }
}
module.exports = { connectDB, mongoose };