const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../modules/User');

const router = express.Router();

const { encryptPassword, decryptPassword } = require('../encryptionHandler');
const authorize = require('../jwtAuthouriser');

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
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    const decryptedPassword = decryptPassword({
      password: userDoc.password,
      iv: userDoc.iv,
    });
    if (decryptedPassword === password) {
      jwt.sign(
        { userId: userDoc._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '10h' },
        (error, token) => {
          if (error) {
            res.status(500).send({ message: 'Unable to generate token' });
          } else
            res
              .status(200)
              .send({ message: 'Login Successful', token, user: userDoc._id });
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

router.get('/check-token', authorize, (req, res) => {
  res.status(200).send(req.headers.authorization.split(' ')[1]);
});

module.exports = router;
