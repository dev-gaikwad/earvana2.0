const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../modules/User');

const router = express.Router();

const { encryptPassword, decryptPassword } = require('../encryptionHandler');
const authorize = require('../jwtAuthouriser');

const decodeJWT = (token) => jwt.decode(token.split(' ')[1]);

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { encryptedPassword, iv } = encryptPassword(password);

    await User.create({
      username,
      email,
      password: encryptedPassword,
      iv,
    });
    res.status(201).send({ message: 'User Registered' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'User Already Exists' });
    } else {
      res.send(error);
    }
  }
});

router.post('/authenticate', async (req, res) => {
  const { email: inputEmail, password: inputPassword } = req.body;
  try {
    const { _id, username, email, password, iv, addresses, cart, wishlist } =
      await User.findOne({ email: inputEmail });
    const decryptedPassword = decryptPassword({
      password,
      iv,
    });
    if (decryptedPassword === inputPassword) {
      jwt.sign(
        { userId: _id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '10h' },
        (error, token) => {
          if (error) {
            res.status(500).send({ message: 'Unable to generate token' });
          } else
            res.status(200).send({
              message: 'Login Successful',
              token,
              user: { userId: _id, username, email, addresses, cart, wishlist },
            });
        }
      );
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('UserDoc not Found -> ', error);
    res.status(400).send({ message: 'No such User' });
  }
});

router.get('/check-token', authorize, async (req, res) => {
  const { userId } = decodeJWT(req.headers.authorization);
  User.findOne({ _id: userId })
    .then(({ _id, username, email, addresses, cart, wishlist }) =>
      res.status(200).send({
        message: 'Login Successful',
        token: req.headers.authorization.split(' ')[1],
        user: { userId: _id, username, email, addresses, cart, wishlist },
      })
    )
    .catch((error) =>
      res.status(500).send({ message: 'Internal server error' })
    );
});

module.exports = router;
