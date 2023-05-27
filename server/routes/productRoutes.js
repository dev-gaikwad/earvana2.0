const express = require('express');

const Product = require('../modules/Product');
const router = express.Router();

router.post('/add-product', async (req, res) => {
  console.log(req.body);
  const {
    name,
    brand,
    category,
    in_ear,
    wired,
    image_url,
    price,
    discount,
    rating,
    description,
  } = req.body;

  try {
    await Product.create({
      name,
      brand,
      category,
      in_ear,
      wired,
      image_url,
      price,
      discount,
      rating,
      description,
    });
    res.status(201).send({ message: 'Product Registered' });
  } catch (error) {
    if (error.code === 11000) {
      console.log('error -> ', error);
      res.status(400).send({ message: 'Product Already Exists' });
    } else {
      res.send(error);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (allProducts) {
      res.status(200).json(allProducts);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
