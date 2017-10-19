var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var object = req.body;
   console.log('abv');
   var users = req.db.get('users');
   users.insert(object);
   
});

router.get('/',function(req,res,next){
    
})

module.exports = router;