var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET register page */
router.get('/', function (req, res, next) {
  res.render('register');
});

/* Post request  */
router.post('/', function (req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function (err) {
    if (err) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    }else{
      console.log('check DB');
      res.redirect('/');
    }
  });
});
module.exports = router;
