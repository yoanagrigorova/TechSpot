var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + " " + password);
    var db = req.db;
    var users = db.get('users');
    users.find({ username: username, password: password })
        .then(function(data) {
            if (data.length > 0) {
                req.session.userId = data[0]._id;
                res.json({ success: true }).render('index.html');
                console.log("test");
                res.render("index");
            } else {
                res.render('login', { message: 'Invalid data' });
            }
        });
});

router.get('/', function(req, res, next) {
    if (req.session.username)
        res.redirect('/');
    else
        res.render('login');
});

module.exports = router;