//../model/tutorial.js
var db = require('../db/db.js');

exports.update = function(req){

    var question1 = req.question1;
    var question2 = req.question2;
    var question3 = req.question3;
    var question4 = req.question4;
    var question5 = req.question5;
    var question6 = req.question6;
    var question7 = req.question7;
    var question8 = req.question8;
    var question9 = req.question9;
    var question10 = req.question10;
    var question11 = req.question11;
    var question12 = req.question12;
    var question13 = req.question13;
    var question14 = req.question14;
    var question15 = req.question15;
    var question16 = req.question16;
    var question17 = req.question17;
    var question18 = req.question18;
    var question19 = req.question19;
    var question20 = req.question20;
    var question21 = req.question21;
    var question22 = req.question22;
    var question23 = req.question23;
    var question24 = req.question24;
    var question25 = req.question25;
    var question26 = req.question26;
    var question27 = req.question27;
    var question28 = req.question28;
    var question29 = req.question29;
    var question30 = req.question30;
    var question31 = req.question31;
    var question32 = req.question32;
    var question33 = req.question33;
    var question34 = req.question34;
    var question35 = req.question35;
    var question36 = req.question36;
    var question37 = req.question37;
    var question38 = req.question38;
    var question39 = req.question39;
    var question40 = req.question40;
    var question41 = req.question41;
    var question42 = req.question42;
    var question43 = req.question43;
    var question44 = req.question44;
    var question45 = req.question45;
    var question46 = req.question46;
    var question47 = req.question47;
    var question48 = req.question48;
    var question49 = req.question49;
    var question50 = req.question50;
    var question51 = req.question51;
    var question52 = req.question52;
    var question53 = req.question53;
    var question54 = req.question54;
    var question55 = req.question55;
    var question56 = req.question56;
    var question57 = req.question57;
    var question58 = req.question58;
    var question59 = req.question59;
    var question60 = req.question60;
    var question61 = req.question61;
    var question62 = req.question62;
    var question63 = req.question63;
    var question64 = req.question64;
    var question65 = req.question65;
    var question66 = req.question66;
    var question67 = req.question67;
    var question68 = req.question68;
    var question69 = req.question69;
    var question70 = req.question70;
    var question71 = req.question71;
    var question72 = req.question72;
    var question73 = req.question73;
    var question74 = req.question74;
    var question75 = req.question75;
    var question76 = req.question76;
    var question77 = req.question77;
    var question78 = req.question78;
    var question79 = req.question79;
    var question80 = req.question80;
    var question81 = req.question81;
    var question82 = req.question82;
    var question83 = req.question83;
    var question84 = req.question84;
    var question85 = req.question85;
    var question86 = req.question86;
    var question87 = req.question87;
    var question88 = req.question88;
    var question89 = req.question89;
    var question90 = req.question90;
    var question91 = req.question91;
    var question92 = req.question92;
    var question93 = req.question93;
    var question94 = req.question94;

    var additionalSurvey1 = req.additionalSurvey1;
    var additionalSurvey2 = req.additionalSurvey2;
    var additionalSurvey3 = req.additionalSurvey3;
    var additionalSurvey4 = req.additionalSurvey4;
    var additionalSurvey5 = req.additionalSurvey5;
    var additionalSurvey6 = req.additionalSurvey6;

    var additionalSurvey1Day3 = req.additionalSurvey1Day3;
    var additionalSurvey2Day3 = req.additionalSurvey2Day3;
    var additionalSurvey3Day3 = req.additionalSurvey3Day3;
    var additionalSurvey4Day3 = req.additionalSurvey4Day3;
    var additionalSurvey5Day3 = req.additionalSurvey5Day3;
    var additionalSurvey6Day3 = req.additionalSurvey6Day3;

    var goodLearner =req.goodLearner;
    //var helpfulComment = req.helpfulComment;
    var goodGrades = req.goodGrades;
    //var appropriateComment = req.appropriateComment;
    var studyingEfficiently = req.studyingEfficiently;
    //var easyComment = req.easyComment;
    var consent_val = req.consent_val;
    var collection = db.get().survey;
    var firstName = req.firstName;
    var lastName = req.lastName;
    var studentID = req.studentID;
    var university = req.university;
    var professor = req.professor;
    var identiKey = req.identiKey;
    var n = req.n;

    collection.insert({identikey: identiKey, firstName: firstName, lastName: lastName, studentID: studentID, university: university, professor: professor, n: n, consent_val: consent_val, additionalSurvey1: additionalSurvey1, additionalSurvey2: additionalSurvey2, additionalSurvey3: additionalSurvey3, additionalSurvey4: additionalSurvey4, additionalSurvey5: additionalSurvey5, additionalSurvey6: additionalSurvey6,goodLearner: goodLearner, goodGrades: goodGrades, studyingEfficiently: studyingEfficiently,
        additionalSurvey1Day3: additionalSurvey1Day3,additionalSurvey2Day3: additionalSurvey2Day3,additionalSurvey3Day3: additionalSurvey3Day3, additionalSurvey4Day3: additionalSurvey4Day3, additionalSurvey5Day3: additionalSurvey5Day3,additionalSurvey6Day3: additionalSurvey6Day3,
        question1: question1, question2: question2,question3: question3,question4: question4, question5: question5,question6: question6, question7: question7, question8: question8, question9: question9, question10: question10,
        question11: question11, question12: question12,question13: question13,question14: question14, question15: question15,question16: question16, question17: question17, question18: question18, question19: question19, question20: question20,
        question21: question21, question22: question22,question23: question23,question24: question24, question25: question25,question26: question26, question27: question27, question28: question28, question29: question29, question30: question30,
        question31: question31, question32: question32,question33: question33,question34: question34, question35: question35,question36: question36, question37: question37, question38: question38, question39: question39, question40: question40,
        question41: question41, question42: question42,question43: question43,question44: question44, question45: question45,question46: question46, question47: question47, question48: question48, question49: question49, question50: question50,
        question51: question51, question52: question52,question53: question53,question54: question54, question55: question55,question56: question56, question57: question57, question58: question58, question59: question59, question60: question60,
        question61: question61, question62: question62,question63: question63,question64: question64, question65: question65,question66: question66, question67: question67, question68: question68, question69: question69, question70: question70,
        question71: question71, question72: question72,question73: question73,question74: question74, question75: question75,question76: question76, question77: question77, question78: question78, question79: question79, question80: question80,
        question81: question81, question82: question82,question83: question83,question84: question84, question85: question85,question86: question86, question87: question87, question88: question88, question89: question89, question90: question90,
        question91: question91, question92: question92,question93: question93,question94: question94

    });

}
