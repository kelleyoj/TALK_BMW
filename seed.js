var Blog = require('./models/blog');
var Comment = require('./models/comment');

var data = [{
    title: 'BMW is the greatest ever',
    image: 'https://images.unsplash.com/photo-1528659960408-6afcdde40a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    subtitle: 'So so amazing',
    author: 'Otis Kelley',
    content: 'Some quick example text to build on the card title and make up the bulk of the card content'
        + 'ome quick example text to build on the card title and make up the bulk of the card content',
    comment: { comment: 'sdfsdfsdfsd' }
},
{
    title: 'Ferrari is the greatest ever',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    subtitle: 'So so amazing',
    author: 'Otis Kelley',
    content: 'Some quick example text to build on the card title and make up the bulk of the card content'
        + 'ome quick example text to build on the card title and make up the bulk of the card content',

},
{
    title: 'Camero is the greatest ever',
    image: 'https://images.unsplash.com/photo-1523676060187-f55189a71f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    subtitle: 'So so amazing',
    author: 'Otis Kelley',
    content: 'Some quick example text to build on the card title and make up the bulk of the card content'
        + 'ome quick example text to build on the card title and make up the bulk of the card content',
},
{
    title: 'BMW is the greatest ever',
    image: 'https://images.unsplash.com/photo-1528659960408-6afcdde40a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    subtitle: 'So so amazing',
    author: 'Otis Kelley',
    content: 'Some quick example text to build on the card title and make up the bulk of the card content'
        + 'ome quick example text to build on the card title and make up the bulk of the card content',
},
{
    title: 'BMW is the greatest ever',
    image: 'https://images.unsplash.com/photo-1528659960408-6afcdde40a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    subtitle: 'So so amazing',
    author: 'Otis Kelley',
    content: 'Some quick example text to build on the card title and make up the bulk of the card content'
        + 'ome quick example text to build on the card title and make up the bulk of the card content',
},
{
    title: 'BMW is the greatest ever',
    image: 'https://images.unsplash.com/photo-1528659960408-6afcdde40a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    subtitle: 'So so amazing',
    author: 'Otis Kelley',
    content: 'Some quick example text to build on the card title and make up the bulk of the card content'
        + 'ome quick example text to build on the card title and make up the bulk of the card content',
}
];

function seedDB() {
    Blog.remove({}, function (err) {
        if (err) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        } else {
            console.log('remove all blogs. Time to seed :)');
        }

        // add blogs from data
        data.forEach(function (seed) {
            Blog.create(seed, function (err, blog) {
                if (err) {
                    throw err;
                }
            });
        });
    });
}
module.exports = seedDB;