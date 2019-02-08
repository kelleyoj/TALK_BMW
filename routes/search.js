var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

/* Get Search page */
router.post('/', function (req, res, next) {
    Blog.find({ $text: { $search: req.body.search } }, function (err, blogs) {
        if (err) {
            res.render('error');
        } else {
            res.render('search', { blog: blogs, search_term: req.body.search });
        }
    });
})

module.exports = router;