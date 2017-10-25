var express = require('express');
var router = express.Router();



/* GET home page. */
router.post('/', function(req, res, next) {
   var object = {name : req.body.name};
   var users = req.db.get('users');
   users.insert(object);
   

   res.json(a);
   res.end();

   
});



router.get('/',function(req,res,next){
    res.redirect('index.html')
})

module.exports = router;