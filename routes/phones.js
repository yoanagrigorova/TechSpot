var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var phones = db.get('phones');
    phones.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

module.exports = router;