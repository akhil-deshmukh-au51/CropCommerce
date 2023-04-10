const express = require('express');
const router = express.Router();
// load product model
const Product = require('../models/Product');

// Define the product route
router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.render('Product', { products });
    } catch (err) {
      console.error(err);
      res.send('Error retrieving products');
    }
  });

  module.exports = router;