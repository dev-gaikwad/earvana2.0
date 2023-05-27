const express = require('express');

const authorize = require('../jwtAuthouriser');

const router = express.Router();

router.get('/profile', authorize, (req, res) => {
  res.send({ message: 'user profile goes here' });
});

module.exports = router;
