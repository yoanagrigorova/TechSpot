var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var db = req.db;
    var users = db.get('users');
    users.find({ mail: username, password: password })
        .then(function(data) {
            if (data.length > 0) {
                console.log(data);
                req.session.user = data[0];
                res.json(data);
                // var sesiq = req.session.userId;
                // console.log(sesiq);

                var sesiq = req.session.userId;
                res.json(200, data);
                // res.json(users.find({ mail: sesiq }));
                // res.redirect('/');


            } else {
                res.json({ message: 'Invalid data' });
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