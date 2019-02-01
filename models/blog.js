var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create Schema
var blogSchema = new Schema({
    title: String,
    subtitle: String,
    author: String,
    image: String,
    content: String,
    comment: {
        comment: String,
        username: String,
        date: {type: Date, default: Date.now}
    },
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema,'blog');

module.exports = Blog;