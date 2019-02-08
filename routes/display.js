var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var Comment = require('../models/comment');

/* Show Route */
router.get('/:id', function (req, res, next) {
  var auth = 'kelleyoj@gmail.com';
  var id = req.params.id;
  console.log("ID" + id);
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.render('error');
    } else {
      Comment.find({ id: id }, function (err, foundComment) {
        if (err) {
          res.render('error');
        } else {
          Blog.find({}).sort('date').exec(function (err, docs) {
            if (err) {
              res.render('error');
            } else {
              res.render('display', { blog: foundBlog, user: req.user, auth: auth, comment: foundComment, post: docs });
            }
          });
        }
      });
    }
  });
})

  /* Edit route */
  .get('/:id/edit', function (req, res, next) {
    Blog.findById(req.params.id, function (err, foundBlog) {
      if (err) {
        res.render('error');
      } else {
        res.render('edit', { blog: foundBlog });
      }
    });
  })
  /* Put route */
  .post('/:id/edit', function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, { new: true }, function (err, updateBlog) {
      if (err) {
        res.render('error');
      } else {
        updateBlog.title = req.body.title
        updateBlog.subtitle = req.body.subtitle
        updateBlog.image = req.body.image
        updateBlog.content = req.body.content
        updateBlog.save(function (err) {
          if (err) {
            res.render('error');
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
        res.render('error');
      } else {
        res.redirect('/');
      }
    });
  })
  .get('/recent/post', function (req, res) {
    Blog.findOne({}, {}, { sort: { 'created': -1 } }, function (err, recentBlog) {
      if (err) {
        res.render('error');
      } else {
        Blog.find({}).sort('date').exec(function (err, docs) {
          if (err) {
            res.render('error');
          } else {
            console.log(recentBlog);
            console.log(docs);
            res.render('display', { blog: recentBlog, user: req.user, post: docs });
          }
        });
      }
    });
  })
  .get('/popular/choice', function (req, res) {
    Blog.find({}, function (err, luckyBlog) {
      if (err) {
        res.render('error');
      } else {
        Blog.find({}).sort('date').exec(function (err, docs) {
          if (err) {
            res.render('error');
          } else {
            var len = luckyBlog.length;
            var ranNum = Math.floor(Math.random() * len);
            var ranBlog = luckyBlog[ranNum];
            res.render('display', { blog: ranBlog, user: req.user, post: docs });
          }
        });
      }
    });
  })
  .get('/editor/choice', function (req, res) {
    Blog.find({}, function (err, luckyBlog) {
      if (err) {
        res.render('error');
      } else {
        Blog.find({}).sort('date').exec(function (err, docs) {
          if (err) {
            res.render('error');
          } else {
            var len = luckyBlog.length;
            var ranNum = Math.floor(Math.random() * len);
            var ranBlog = luckyBlog[ranNum];
            res.render('display', { blog: ranBlog, user: req.user, post: docs });
          }
        });
      }
    });
  })
  .get('/lucky/cat', function (req, res) {
    Blog.find({}, function (err, luckyBlog) {
      if (err) {
        res.render('error');
      } else {
        Blog.find({}).sort('date').exec(function (err, docs) {
          if (err) {
            res.render('error');
          } else {
            var len = luckyBlog.length;
            var ranNum = Math.floor(Math.random() * len);
            var ranBlog = luckyBlog[ranNum];
            res.render('display', { blog: ranBlog, user: req.user, post: docs });
          }
        });
      }
    });
  });

module.exports = router;