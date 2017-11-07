var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var db = req.db;
    var id = req.body._id;
    var selection = db.get('users');
    selection.update({ _id: id }, req.body, function(e, docs) {
        if (e) {
            console.log(e)
        } else {
            req.session.destroy();
            res.redirect('/');
        }
    });
});


module.exports = router;