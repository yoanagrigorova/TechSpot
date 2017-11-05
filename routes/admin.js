var express = require('express');
var router = express.Router();

router.post('/:collection/:id', function (req, res, next) {
    var db = req.db;
    var collection = req.params.collection;
    var id = req.params.id;
    var selection = db.get(collection);  
    selection.update({_id: id}, req.body).then(function(e, docs) {
      if (e){
          console.log(e);
      } else {
          res.json({message: 'Продуктът беше променен успешно!'})
      }

    });
    

});

router.delete('/:collection/:id', function (req, res, next) {
    var db = req.db;
    var collection = req.params.collection;
    var id = req.params.id;
    var selection = db.get(collection);
    selection.deleteOne({_id: id}, {}).then(function(e, docs){
      if (e){
          throw e
      } else {
          res.json({message: 'Продуктът беше изтрит успешно!'})
      }
    })  
});

module.exports = router;