var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

/* GET home page. */
router.get('/', function (req, res, next) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    } else {
      res.render('index', { blog: blogs });
    }
  });
})

module.exports = router;
