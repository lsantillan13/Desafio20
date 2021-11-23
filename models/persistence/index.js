const Memory = require('./memoryClass.js');
const FileSystem = require('./fileSystemClass.js');
const Sql = require('./SqlClass.js');
const MongoDb = require('./mongoDbClass.js');
const Firebase = require('./firebaseClass.js');

const classes = {
	Memory,
	FileSystem,
	Sql,
	MongoDb,
	Firebase,
};

module.exports.classes = classes;