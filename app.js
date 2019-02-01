var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

// var url = 'mongodb://localhost/testdb';


var pw = 'nFgRmE7pQ7uLpVi';
var url = 'mongodb://kelleyoj:' + pw + '@ds011735.mlab.com:11735/bmw';

//magic∂
var app = express();

app.use(methodOverride('_method'));

// requiring routes
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var displayRouter = require('./routes/display');
var newRouter = require('./routes/new');
var commentRouter = require('./routes/comment');


// Schema require
var Blog = require('./models/blog');
var Comment = require('./models/comment');
var User = require('./models/user');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view options', { pretty: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


// seed data for testing
var seedDB = require('./seed');
seedDB();

mongoose.connect(url, function (err, db) {
  if (err) {
    throw err
  } else {
    console.log('Connected');
  }
});

// routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/display', displayRouter);
app.use('/new', newRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
