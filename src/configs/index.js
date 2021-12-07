const sqliteOptions  = require('./sqliteOptions.js');
const mySqlOptions   = require('./mySqlOptions.js');
const mongoDbConfigs = require('./mongoDbOptions.js');
const configs = {
	sqliteOptions,
	mySqlOptions,
	mongoDbConfigs,
};

module.exports = configs;