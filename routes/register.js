const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Define the register route
router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const { firstname, lastname, email, mobile, username, password, confirmPassword, address } = req.body;

  // Validate the inputs
  const errors = [];

  if (!firstname || !lastname || !email || !mobile || !username || !password || !confirmPassword || !address) {
    errors.push('All fields are required.');
  }

  if (password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }

  if (mobile.length !== 10 || !/^[0-9]+$/.test(mobile)) {
    errors.push('Mobile number should contain 10 digits only.');
  }

  // If there are any errors, display them to the user
  if (errors.length > 0) {
    res.render('register', { errors });
    return;
  }

  // Create a new user and save it to the database
  try {
    const user = new User({ firstname, lastname, email, mobile, username, password, address });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.render('register', { errors: ['An account with this email or mobile number already exists.'] });
  }
});

module.exports = router;
