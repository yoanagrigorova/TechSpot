var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('registration')
    function User(firstName, lastName, mail, phone, password) {
        if (firstName.trim().length > 0 && lastName.trim().length > 0 && mail.trim().length > 0 && mail.indexOf("@") !== -1 &&
            phone.startsWith("08") && phone.length === 10 && password.length >= 5) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.mail = mail;
            this.phone = phone;
            this.password = password;
        } else {
            throw new Error("Incorrect information");
            alert("Invalid data!");
        }
    }

    document.getElementById("cancel").addEventListener("click", function(event) {
        event.preventDefault();
        redirect('/login');
    })
    var name = document.getElementById("name").value;
    var lastName = document.getElementById("lastName").value;
    var mail = document.getElementById("mail").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("pass").value;
    var repeatPass = document.getElementById("repeatPass").value;
    register.addEventListener("click", function(event) {
        event.preventDefault();
        if (password === repeatPass) {
            $http.post("finalProjectdb", new User(name, lastName, mail, phone, password));
        }
    })
})

router.get('/', function(req, res, next) {
    if (req.session.username)
        res.redirect('/login');
    else
        res.render('registration');
});

module.exports = router;