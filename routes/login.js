const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Set up the login route
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Find the user with the given username
  const user = await User.findOne({ username });

  // If the user doesn't exist, display an error message
  if (!user) {
    res.render('login', { errors: ['Invalid username or password.'] });
    return;
  }

  // Check if the password is correct
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.render('login', { errors: ['Invalid username or password.'] });
    return;
  }
 
  // If the username and password are correct, log the user in
  res.redirect('/products');
});

module.exports = router;
