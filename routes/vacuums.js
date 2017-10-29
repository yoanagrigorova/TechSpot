var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var vacuums = db.get('vacuumCleaners');
    vacuums.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:vc_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('vacuumCleaners');
    var id = req.params.vc_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;