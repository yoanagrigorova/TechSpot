var express = require('express');
var router = express.Router();

router.post('/:collection/:id', function (req, res, next) {
    var db = req.db;
    var collection = req.params.collection;
    var id = req.params.id;
    var selection = db.get(collection);  
    selection.update({_id: id}, req.body, function(e, docs) {
      if (e){
          console.log('greshka')
      } else {
          console.log('stignah')
          res.json({message: 'Продуктът беше променен успешно!'})
      }

    });
});

router.delete('/:collection/:id', function (req, res, next) {
    var db = req.db;
    var collection = req.params.collection;
    var id = req.params.id;
    var selection = db.get(collection);
    selection.remove({_id: id}, {}, function(e, docs){
      if (e){
           res.json({message: e});
      } else {
          res.json({message: 'Продуктът беше изтрит успешно!'});
      }
    })  
});

module.exports = router;