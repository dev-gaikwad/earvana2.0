const mongoose = require('mongoose');

const Product = require('./Product');

const UserSchema = mongoose.Schema({
  userId: mongoose.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  iv: String,
  addresses: [
    {
      first_name: String,
      last_name: String,
      street_name: String,
      street_address: String,
      city: String,
      zip_code: Number,
      state: String,
      country: String,
    },
  ],
  cart: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  wishlist: [{ product: { type: Object, required: true } }],
  created_at: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
