var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var tvs = db.get('tvs');
    tvs.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:tvs_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('tvs');
    var id = req.params.tvs_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;