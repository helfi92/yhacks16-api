var MongoClient = require('mongodb').MongoClient;

module.exports = new Promise(function(resolve, reject) {
  MongoClient.connect('mongodb://localhost:27017/yhacks2016', function(err, db) {
    if (err) {
      reject(err);
      throw err;
    }

    resolve(db);
  });
});
