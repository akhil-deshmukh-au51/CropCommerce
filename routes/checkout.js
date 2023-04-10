const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Define the route for the checkout page
router.get('/', (req, res) => {
    // Get the cart from the cookies
    const cart = req.cookies.cart || {
    items: [],
    totalPrice: 0
    };
    // Render the checkout page with the cart
    res.render('checkout', {
        cart: cart
    });
    });

    module.exports = router;