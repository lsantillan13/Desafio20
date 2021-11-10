module.exports = function messageDELETE(){
    /*Essentials*/
    const {options3} = require('../../options/sqlite3/sqlite3.js');
    const knex = require('knex')(options3);
        knex('messages')
        .del()
        .then(res => console.log('Mensaje Borrado!') && console.log(res))
}
