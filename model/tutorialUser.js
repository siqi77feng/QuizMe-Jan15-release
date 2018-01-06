var db = require('../db/db.js');

exports.update = function(req){

    var firstName = req.firstName;
    var lastName = req.lastName;
    var identikey = req.identikey;
    var subject = req.subject;
    var n = req.n;
    var collection = db.get().tutorial;
    collection.insert({ identikey: identikey, firstName: firstName, lastName: lastName, subject: subject, oneWeekEmail: 0 , n: n,  emailSent: 0, date: new Date() });

}
