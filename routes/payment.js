const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/payment', async (req, res) => {
    // Get the cart from the cookies
    const cart = req.cookies.cart || {
    items: [],
    totalPrice: 0
    };
    // Process the payment and complete the order
    // Send confirmation email using Nodemailer
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'eugene6@ethereal.email',
                pass: 'WHNVMXkMefNUbAByVj'
        }
    });
    
    let mailOptions = {
        from: '"Your Name" <eugene6@ethereal.email>',
        to: req.body.email,
        subject: 'Payment Confirmation',
        text: 'Thank you for your payment. We have received your order and will process it soon.'
    };
    
    await transporter.sendMail(mailOptions);
    
    // Clear the cart
    res.clearCookie('cart');
    
    // Render the order confirmation page
    res.render('confirmation');
    });
module.exports = router;