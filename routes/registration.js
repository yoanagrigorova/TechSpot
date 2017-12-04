var express = require('express');
var sha1 = require("sha1");
var router = express.Router();
// var User = require('../public/dist/bundle.js').User;

router.post('/', function(req, res, next) {

    var name = req.body.name;
    var lastName = req.body.lastName;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var password = req.body.password;
    var password2 = req.body.password2;

    var db = req.db;
    var users = db.get("users");
    users.find({ mail: mail }).then(function(data) {
        if (data.length == 0) {
            try {
                var user = new User(name, lastName, mail, phone, sha1(password));
                users.insert(user);
                res.json({ message: 'Successful registration!', success: true });
            } catch (err) {
                res.json({ message: err });
            }

        } else {
            res.json({ message: 'Email is already taken!' });
        }
    });
})


module.exports = router;