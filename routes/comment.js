var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var Comment = require('../models/comment');
var validator = require('validator');

// Create new comment
router.post('/:id/new', function (req, res) {
    var comment = req.body.comment;
    var isEmpty = validator.isEmpty(comment);
    
    if (isEmpty) {
        req.flash('error_msg', 'Comments Can\'t Be Empty');
        res.redirect('/display/' + req.params.id);
    } else if (req.user == undefined) {
        req.flash('error_msg', 'You Have To Be Logged In To Comment.');
        res.redirect('/user/login');
    } else {
        var author = req.user.name;
        var newComment = new Comment({
            author: author,
            description: req.body.comment,
            id: req.params.id
        });
        newComment.save(function (err) {
            if (err) {
                res.render('error');
            } else {
                res.redirect('/display/' + req.params.id);
            }
        });
    }
})
    .get('/:id/delete', function (req, res) {
        var id = req.params.id;
        Comment.findOneAndRemove({ id: id }, function (err) {
            if (err) {
                res.render('error');
            } else {
                res.redirect('/display/' + req.params.id);
            }
        });
    })


module.exports = router;