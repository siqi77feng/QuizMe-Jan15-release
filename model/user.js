var db = require('../db/db.js');

exports.update = function(req,cb){
    var identikey = req.identiKey;
    var collection = db.get().users;

    collection.find({_id: identikey}).toArray(function(err,res){
        if (res.length > 0){
            collection.updateOne({_id: identikey}, {$inc: {login_count: 1}});

            cb(0);
        } else {
            collection.insert({ _id: identikey, login_count: 1});

            cb(0)
        }
    });

}
