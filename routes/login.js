var express = require('express');
var sha1 = require("sha1");
var router = express.Router();

router.post('/', function(req, res, next) {
    var username = req.body.user;
    var password = req.body.password;
    // var cryptedPass = sha1(password);
    var db = req.db;
    var users = db.get('users');
    users.find({ mail: username, password: password }).then(function(data) {
        if (data.length > 0) {
            req.session.user = data[0];
            console.log(req.session.user.permission);
            var sesiq = req.session.userId;
            res.json({ success: true, message: 'Login successful!', user: data });
            res.end();
        } else {
            res.json({ success: false, message: 'Invalid username or password!' });
        }
    });
});

// router.get('/', function(req, res, next) {
//     if (req.session.username)
//         res.redirect('/');
//     else
//         res.render('login');
// });

module.exports = router;