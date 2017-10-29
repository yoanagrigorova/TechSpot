var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var cond = db.get('airConditioners');
    cond.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:cond_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('airConditioners');
    var id = req.params.cond_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;