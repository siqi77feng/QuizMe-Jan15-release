var db = require('../db/db.js');

exports.update = function(req){

    var firstName = req.firstName;
    var lastName = req.lastName;
    var identikey = req.returnID;
    var collection = db.get().finished;
    collection.insert({ identikey: identikey, firstName: firstName, lastName:lastName, date: new Date(), sentEmail : 0 });

}
