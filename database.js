var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dbUrl;

var database = {

    insertDocuments: function(documents, collection, callback) {
        var coll = db.collection(collection);

        coll.insertMany(documents, function(err, result) {
            assert.equal(err, null);
            assert.equal(documents.length, result.result.n);
            assert.equal(documents.length, result.ops.length);
            console.log("Inserted " + documents.length + " documents into collection: " + collection);
            callback(result);
        });
    },

    find: function(findObj, collection, callback) {
        var coll = db.collection(collection);

        coll.find(findObj).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    }
};

module.exports = function(url) {
    dbUrl = url;

    //Check the database connection. If not connected, return null.
    MongoClient.connect(dbUrl, function(err, db) {
        if (err === null) {
            return null;
        }
        else {
            return database;
        }
    });
}
