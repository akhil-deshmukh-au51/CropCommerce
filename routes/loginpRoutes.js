const express = require('express');
const router = express.Router();
const Loginp = require('../models/loginp');

router.get('/', (req, res) => {
    res.render('loginp');
  });
  
  
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await Loginp.findOne({ username });
      if (!user) {
        throw new Error();
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error();
      }
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (err) {
      return res.status(409).send('Invalid username or password');
    }
  });

  module.exports = router;  