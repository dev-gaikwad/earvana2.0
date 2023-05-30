const express = require('express');
const jwt = require('jsonwebtoken');

const authorize = require('../jwtAuthouriser');
const User = require('../modules/User');

const router = express.Router();

const decodeJWT = (token) => jwt.decode(token.split(' ')[1]);

router.get('/cart', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).send({ cart: user.cart });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/cart', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  try {
    const inputProduct = req.body;
    User.findOne({ _id: userId })
      .then((user) => {
        const productIndex = user.cart.findIndex(
          (item) => item.product._id.toString() === inputProduct._id
        );
        if (productIndex !== -1) {
          user.cart[productIndex].quantity += 1;
        } else {
          user.cart.push({
            product: { ...inputProduct },
            quantity: 1,
          });
        }
        return user.save();
      })
      .then(() => {
        res.status(200).send({ message: 'Item added to cart' });
      })
      .catch((error) => {
        console.log('Adding ewrror -> ', error);
        res.status(400).send({ message: 'Unable to add. Please try later' });
      });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong internally' });
  }
});

module.exports = router;
