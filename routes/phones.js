var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var phones = db.get('phones');
    phones.find({}, {}, function(err, docs) {
        res.json(docs);
    });
})

router.get("/:phones_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('phones');
    var id = req.params.phones_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
});


module.exports = router;