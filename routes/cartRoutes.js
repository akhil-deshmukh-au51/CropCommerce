const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
// load cart model
// const Cart = require('../models/Cart');

// Define the route for adding a product to the cart
router.post('/cart/add', async (req, res) => {
    try {
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Get the current cart from the cookies or create a new one
        //Check if the cart already exists in the cookies
        const cart = req.cookies.cart || {
          items: [],
          totalPrice: 0
          };
// Check if the item already exists in the cart
const existingItem = cart.items.find(item => item.product._id.toString() === product._id.toString());
if (existingItem) {
    existingItem.quantity += quantity;
} else {
    cart.items.push({
        product: product,
        quantity: quantity
    });
}



// Update the total price
cart.totalPrice += product.price * quantity;

// Store the updated cart in the cookies
res.cookie('cart', cart);

// Redirect to the cart page
res.redirect('/cart');
} catch (err) {
console.error(err);
res.status(500).send('Internal Server Error');
}
});

// Define the route for the cart page
router.get('/cart', (req, res) => {
// Get the cart from the cookies
const cart = req.cookies.cart || {
items: [],
totalPrice: 0
};
// Render the cart page with the cart
res.render('cart', {
    cart: cart
});
});

module.exports = router;