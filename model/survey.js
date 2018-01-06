var db = require('../db/db.js');

exports.update = function(req){ 
    var docID = req.docID;
    var helpfulVal = req.helpfulVal;
    var helpfulComment = req.helpfulComment;
    var appropriateVal = req.appropriateVal;
    var appropriateComment = req.appropriateComment;
    var easyVal = req.easyVal;
    var easyComment = req.easyComment;
    var collection = db.get().survey;
    var firstName = req.firstName;
    var lastName = req.lastName;
    var n = req.n;

	collection.insert({docID: docID, firstName: firstName, lastName: lastName, helpfulVal: helpfulVal, helpfulComment: helpfulComment,
						appropriateVal: appropriateVal, appropriateComment: appropriateComment, 
						easyVal: easyVal, easyComment: easyComment});

}
