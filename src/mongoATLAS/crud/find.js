require('../mongo.js');

const User = require('../users.js');

async function main( data ){
    const users = await User.find({name: 'data'})
    console.log(users)
};

module.exports = main;