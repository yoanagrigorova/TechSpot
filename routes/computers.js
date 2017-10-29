var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var computers = db.get('laptops');
    computers.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

module.exports = router;