var db = require('../db/db.js');

exports.update = function(req){ 
    var identikey = req.identiKey;
    var docID = req.docID;
    var firstName = req.firstName;
    var lastName = req.lastName;
    var collection = db.get().documents;
    var numCorrectINA = req.numCorrectINA;
    var numCorrectINB = req.numCorrectINB;
    var numCorrectReturn =req.numCorrectReturn;
    var APercent = req.APercent;
    var BPercent =req.BPercent;
    if (collection == null) {
    	console.log("BACKEND: database not found");
    	return -1;
    } else {
	    collection.insert({identikey: identikey, docID: docID, firstName: firstName,lastName: lastName, APercent: APercent, BPercent: BPercent, numCorrectINA: numCorrectINA, numCorrectINB: numCorrectINB, numCorrectReturn: numCorrectReturn, date: new Date()});
	    return 0;
    }
}

