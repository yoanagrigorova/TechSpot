var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var ovens = db.get('coockers');
    ovens.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:ovens_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('coockers');
    var id = req.params.ovens_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;