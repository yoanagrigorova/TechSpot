var express = require('express');
var sha1 = require("sha1");
var router = express.Router();

router.post('/', function(req, res, next) {
    var username = req.body.user;
    var password = req.body.password;
    var db = req.db;
    var users = db.get('users');
    users.find({ mail: username, password: password }).then(function(data) {
        if (data.length > 0) {
            req.session.user = data[0];

            var sesiq = req.session.userId;
            res.json({ success: true, message: 'Login successful!', user: data });

        } else {
            res.json({ success: false, message: 'Invalid username or password!' });
        }
    });
});

module.exports = router;