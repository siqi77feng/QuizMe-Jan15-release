var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var db_attr = {
  db: null,
  documents: null,
  tutorial: null,
  users: null,
  survey: null,
  finshed: null,
  document_index: null
}

exports.create_db = function(db_name){
  db_attr.db = new Db(db_name, new Server('localhost', 27017));
}

exports.connect = function(url, done) {
  MongoClient.connect(url, function(err, db) {
    if (err){ 
        return done(err);
    }else{
        console.log('connected to database');
    }

    db.createCollection("documents", function(err, collection){
      db_attr.documents = collection;
    });

    db.createCollection("tutorial", function(err, collection){
        db_attr.tutorial = collection;
    });

    db.createCollection("users", function(err, collection){
      db_attr.users = collection;
    });

    db.createCollection("survey", function(err, collection){
      db_attr.survey = collection;
    });

    db.createCollection("finished", function (err, collection) {
        db_attr.finished = collection;
    });


    db.createCollection("document_index", function(err, collection){
      db_attr.document_index = collection;
      collection.find().toArray(function(err, res){
        if (res.length == 0 ){
            collection.insert({index: 0});
        }
	  });
    });

  })
}

exports.get = function() {
  return db_attr
}

exports.close = function(done) {
  if (db_attr.db) {
    db_attr.db.close(function(err, result) {
      db_attr.db = null
      db_attr.mode = null
      done(err)
    });
  }
}
