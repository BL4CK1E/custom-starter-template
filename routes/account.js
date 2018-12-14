// Module Imports
const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../libs/auth')




// Find User
router.get('/', auth.isLoggedIn, async (req, res, next) => {
  delete req.user.password
  res.json({
    route: "/",
    originalUrl: req.headers.referer,
    data: {
      m: "Logged in",
      user: req.user
    }
  });
});



// Create User
router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/api/v1/account/',
  failureRedirect: '/api/v1/account/'
}));



// Auth User
router.post('/auth', (req, res, next) => {

  // Custom Callback
  passport.authenticate('local-signin', (err, user, info) => {

    // Object Setup
    const resObj = {
      status: 200,
      data: { error: err, user: user, info: info, auth: false }
    };

    // If error respond with error
    if (err) { return res.json(resObj); }

    // If user didn't auth, respond with JSON
    if (!user) { 
      return res.json(resObj); 
    }

    // If user didn't auth, respond with JSON
    req.logIn(user, (err) => {
      if (err) { return res.json(resObj); }
      resObj.data.info = "You have been authenticated.";
      resObj.data.auth = true;
      return res.json(resObj); 
    });

  })(req, res, next);

});



// Update User
router.put('/', async (req, res, next) => {
  res.json({ data: req.body });
});

// Logout User
router.get('/logout', auth.isLoggingOut, async (req, res, next) => {
  res.json({
    route: "/",
    originalUrl: req.headers.referer,
    data: {
      m: "Logged out",
      user: req.user
    }
  });
});

module.exports = router;