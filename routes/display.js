var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var Comment = require('../models/comment');

/* Show Route */
router.get('/:id', function (req, res, next) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.send(err);
    } else {
          res.render('display', {blog: foundBlog});
    }
  });
})

  /* Edit route */
  .get('/:id/edit', function (req, res, next) {
    Blog.findById(req.params.id, function (err, foundBlog) {
      if (err) {
        res.send(err);
      } else {
        res.render('edit', { blog: foundBlog });
      }
    });
  })
  /* Put route */
  .post('/:id/edit', function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, { new: true }, function (err, updateBlog) {
      if (err) {
        res.send(err);
      } else {
        updateBlog.title = req.body.title
        updateBlog.subtitle = req.body.subtitle
        updateBlog.image = req.body.image
        updateBlog.content = req.body.content
        updateBlog.save(function (err) {
          if (err) {
            res.send(err);
          } else {
            res.redirect('/display/' + req.params.id);
          }
        });
      }
    });
  })
  .get('/:id/delete', function (req, res) {
    Blog.findByIdAndDelete(req.params.id, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/');
      }
    });
  })

module.exports = router;