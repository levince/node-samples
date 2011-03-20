var sys    = require('util');

var pathMongo='../node-mongodb-native/lib/mongodb';

var Db = require(pathMongo).Db,
Connection = require(pathMongo).Connection,
Server = require(pathMongo).Server,
BSON = require(pathMongo).BSONNative;

var dbmongo 	= new Db('test', new Server('localhost',Connection.DEFAULT_PORT, {}), {});

dbmongo.open(function(err, dbmongo) {
	dbmongo.collection("foo", function(err, collection) {
		treatCollection(collection);
	});
});

var treatCollection= function(myCollection)
{
	// Erase all records from the collection, if any
	myCollection.remove(function(err, myCollection) {

		// Insert records
		for(var i = 0; i < 3; i++) {
			myCollection.insert({"bar":i});
		}

		// find records greater than 0
		myCollection.find({ "bar" : { $gt: 0 } },function(err, cursor) {
			cursor.each(function(err, item) {
				if(item != null) {
					sys.puts(sys.inspect(item));
					sys.puts("created at " + new Date(item._id.generationTime) + "\n")
				}
				// Null means end of iterator
				if(item == null) {
					dbmongo.close();
				}
			});
		});

	});
};




