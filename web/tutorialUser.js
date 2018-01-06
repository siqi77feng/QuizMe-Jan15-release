var db = require('../db/db.js');

exports.update = function(req){

    var name = req.name;
    var identikey = req.identikey;
    var subject = req.subject;
    var yes = req.yes;
    var no = req.no;
    var collection = db.get().tutorial;


    collection.insert({identikey : identikey, name: name, subject: subject, yes: yes, no: no, emailSent: 0, date: new Date() });

}