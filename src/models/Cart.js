const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = model('Cart', CartSchema);
