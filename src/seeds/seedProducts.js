const { connectDB } = require('../db');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

async function seed() {
  await connectDB();
  const filePath = path.join(__dirname, '../data/products.json');
  const raw = await fs.promises.readFile(filePath, 'utf-8');
  const products = JSON.parse(raw);

  await Product.deleteMany({});
  await Product.insertMany(products.map(p => {
    const { id, ...rest } = p;
    return rest;
  }));

  console.log('Seed completado: productos insertados:', products.length);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
