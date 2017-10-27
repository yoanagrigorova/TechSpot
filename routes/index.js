var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
    var name = req.body.name;
    var lastName = req.body.lastName;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var password = req.body.pass;
    var repeatPass = req.body.repeatPass;
    
    console.log(name + " " + lastName);
    var db = req.db;
    var users = db.get("users");
    users.find({ mail: mail }).then(function(data) {
        console.log(data);
        if (data.length == 0) {
            if (password === repeatPass) {
                var user = new User(name, lastName, mail, phone, password);
                users.insert(user);
                res.redirect('back');
            }
        } else {
            res.render('registration', { message: 'E-mail is taken.' });
        }
    });
});



// router.get('/',function(req,res,next){
//     res.redirect('index.html')
// })

module.exports = router;