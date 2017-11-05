var express = require('express');
var router = express.Router();

router.post('/:collection/:id', function (req, res, next) {
    var db = req.db;
    var collection = req.params.collection;
    var id = req.params.id;
    var selection = db.get(collection);
    
    if (id != 'undefined'){
    selection.update({_id: id}, req.body, function(err, result) {
           if (err){
               console.log(err)
           } else {
               res.json({message: 'Продуктът беше променен успешно!'});
           }
        });
    } else {
     selection.insert(req.body, {}, function(err,result){
         if(err){
             console.log(err)
         } else {
             res.json({message: 'Продуктът беше добавен успешно!'})
         }
     })
    }
    
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