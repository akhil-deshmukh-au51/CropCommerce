const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// load product model
const Product = require('../models/Product');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage });


router.get('/', (req, res) => {
    res.render('add');
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name, price } = req.body;
    const product = new Product({
        name,
        price,
        image: req.file.filename
    });
    await product.save();
    res.redirect('/dashboard');
});

module.exports = router;