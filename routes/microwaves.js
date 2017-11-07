var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var microwaveOvens = db.get('microwaveOvens');
    microwaveOvens.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:microwaves_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('microwaveOvens');
    var id = req.params.microwaves_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;