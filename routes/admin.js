var express = require('express');
var router = express.Router();

router.post('/:collection/:id', function (req, res, next) {
    var db = req.db;
    var collection = req.params.collection;
    var id = req.params.id;
    console.log(collection + '?' + id);
    console.log(req.session.user); 
    var selection = db.get(collection);  
    selection.update({_id: id}, req.body).then(function(e, docs) {
      if (e){
          console.log(e);
      }

    });
    res.json({message: 'evala'});

});

module.exports = router;