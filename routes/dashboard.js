const express = require('express');
const router = express.Router();
// load product model
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('dashboard', { products });
});


module.exports = router;