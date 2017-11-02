var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/users.js');

router.post('/', function(req, res, next) {

    // function User(firstName, lastName, mail, phone, password) {
    //     if (firstName.trim().length > 0 && lastName.trim().length > 0 && mail.trim().length > 0 && mail.indexOf("@") !== -1 &&
    //         phone.startsWith("08") && phone.length === 10 && password.length >= 5) {
    //         this.firstName = firstName;
    //         this.lastName = lastName;
    //         this.mail = mail;
    //         this.phone = phone;
    //         this.password = password;
    //     } else {
    //         throw new Error("Incorrect information");

    //     }
    // }

    var name = req.body.name;
    var lastName = req.body.lastName;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var password = req.body.pass;
    var repeatPass = req.body.repeatPass;

    console.log(name + " " + lastName);
    var db = req.db;
    var users = db.get("users");
    // if (password === repeatPass) {
    //     $http.post('users', new User(name, lastName, mail, phone, password));
    //     res.redirect('/');
    // }
    users.find({ mail: mail }).then(function(data) {
        if (data.length == 0) {
            if (password === repeatPass) {
                var user = new User(name, lastName, mail, phone, password);
                users.insert(user);
                res.json({message: 'Successful registration!'}).redirect("/");
            }
        } else {
            res.json({message: 'Email is already taken!'})
        }
    });
})

// router.get('/', function(req, res, next) {
//     // if (req.session.username)
//     //     res.redirect('/login');
//     // else
//     res.render('registration');
// });

module.exports = router;