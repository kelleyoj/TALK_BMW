var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

/* GET home page. */
router.get('/', function (req, res, next) {
  var auth = 'kelleyoj@gmail.com';
  Blog.find({}, function (err, blogs) {
    if (err) {
      res.render('error');
    } else {
      res.render('index', { blog: blogs.reverse(), user: req.user, auth: auth });
    }
  });
})

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
