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
    subtitle: req.body.subtitle,
    image: req.body.image,
    content: req.body.content
  });
  newBlog.save(function (err) {
    if (err) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    }else{
      console.log('new blog added');
      res.redirect('/');
    }
  });
});

module.exports = router;