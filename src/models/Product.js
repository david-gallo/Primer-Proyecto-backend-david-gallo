const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  code: { type: String, default: '' },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: '' },
  thumbnails: { type: [String], default: [] }
}, { timestamps: true });

ProductSchema.virtual('id').get(function() {
  return this._id.toString();
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

module.exports = model('Product', ProductSchema);
