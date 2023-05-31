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

router.post('/addToCart', authorize, async (req, res) => {
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
      .then((user) => {
        res
          .status(200)
          .send({ message: 'Item added to cart', cart: user.cart });
      })
      .catch((error) => {
        console.log('Adding error -> ', error);
        res.status(400).send({ message: 'Unable to add. Please try later' });
      });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong internally' });
  }
});

router.post('/updateCart', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  try {
    const { product_id } = req.body;
    User.findOne({ _id: userId })
      .then((user) => {
        const productIndex = user.cart.findIndex(
          (item) => item.product._id.toString() === product_id
        );
        if (productIndex !== -1) {
          if (user.cart[productIndex].quantity > 1) {
            user.cart[productIndex].quantity -= 1;
          } else {
            user.cart.splice(productIndex, 1);
          }
        }
        return user.save();
      })
      .then((user) =>
        res.status(200).send({ message: 'Cart updated', cart: user.cart })
      )
      .catch(() =>
        res.status(400).send({ message: 'Unable to update cart at the moment' })
      );
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong internally' });
  }
});

router.post('/deleteFromCart', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  try {
    const { product_id } = req.body;
    User.findOne({ _id: userId })
      .then((user) => {
        const productIndex = user.cart.findIndex(
          (item) => item.product._id.toString() === product_id
        );
        if (productIndex !== -1) {
          user.cart.splice(productIndex, 1);
        }
        return user.save();
      })
      .then((user) =>
        res
          .status(200)
          .send({ message: 'Item removed from cart', cart: user.cart })
      )
      .catch(() =>
        res.status(400).send({ message: 'Unable to update cart at the moment' })
      );
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.get('/wishlist', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).send({ wishlist: user.wishlist });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/updateWishlist', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  try {
    const inputProduct = req.body;
    User.findOne({ _id: userId })
      .then((user) => {
        const productIndex = user.wishlist.findIndex(
          (item) => item.product._id.toString() === inputProduct._id
        );
        if (productIndex !== -1) {
          user.wishlist.splice(productIndex, 1);
        } else {
          user.wishlist.push({
            product: { ...inputProduct },
          });
        }
        return user.save();
      })
      .then((user) =>
        res
          .status(200)
          .send({ message: 'Wishlist updated', wishlist: user.wishlist })
      )
      .catch(() =>
        res
          .status(400)
          .send({ message: 'Unable to update wishlist at the moment' })
      );
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
