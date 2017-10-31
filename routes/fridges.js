var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var fridges = db.get('fridges');
    fridges.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:fridge_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('fridges');
    var id = req.params.fridge_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;