var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

// Create new comment
router.post('/:id/new', function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, { new: true }, function (err, newComment) {
        if (err) {
            res.send(err);
        } else {
            newComment.comment.comment = req.body.comment;
            newComment.comment.username = newComment.author;

            newComment.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    res.redirect('/display/'+req.params.id);
                }
            });
        }
    });
});

module.exports = router;