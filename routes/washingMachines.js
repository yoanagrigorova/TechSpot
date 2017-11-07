var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var washing = db.get('washingMachines');
    washing.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:wm_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('washingMachines');
    var id = req.params.wm_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;