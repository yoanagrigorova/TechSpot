var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;