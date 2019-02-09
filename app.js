var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var dotenv = require('dotenv').config();

//magic∂
var app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
var url = process.env.DATABASEURL;
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log(err);
  }
});

// Storing sessions in Db for production
var store = new MongoDBStore({
  uri: url,
  collection: 'sessions'
});

// Catch connect-mongodb-sessions errors
store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'This is a secret',
  store: store,
  resave: true,
  saveUninitialized: true
}));

// Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view options', { pretty: true });

// seed data for testing
var seedDB = require('./seed');
// seedDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// requiring routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/display', require('./routes/display'));
app.use('/new', require('./routes/display'));
app.use('/comment', require('./routes/display'));
app.use('/search', require('./routes/search'));

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
