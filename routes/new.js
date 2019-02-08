var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('new');
});

/* Post new blog to database */
router.post('/', function (req, res) {
  var newBlog = new Blog({
    title: req.body.title,
    author: req.user.name,
    subtitle: req.body.subtitle,
    image: req.body.image,
    content: req.body.content
  });
  newBlog.save(function (err) {
    if (err) {
      res.render('error');
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;