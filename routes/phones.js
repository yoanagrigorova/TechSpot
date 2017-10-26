var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var phones = db.get('phones');
    var allPhones = phones.find({}, {});
    console.log("abv");
    res.json(allPhones);
})

module.exports = router;