const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  id: mongoose.ObjectId,
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  in_ear: Boolean,
  wired: Boolean,
  image_url: String,
  price: Number,
  discount: Boolean,
  rating: Number,
  description: String,
  created_at: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
