module.exports = async function messageREAD(){
    /*Essentials*/
    const {options3} = require('../../options/sqlite3/sqlite3.js');
    const knex = require('knex')(options3);
        let mensajes = await knex.from('messages').select('*');
        console.log('SQLITE3 Listando mensajes...', mensajes)       
}

