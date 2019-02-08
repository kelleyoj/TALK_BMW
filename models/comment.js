var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: String,
    description: String,
    id: String,
    created: { type: Date, default: Date.now }
});

var Comment = mongoose.model('Comment', commentSchema, 'comment');

module.exports = Comment;