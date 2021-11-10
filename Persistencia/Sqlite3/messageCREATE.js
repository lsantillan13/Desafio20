module.exports = async function messageCREATE(){
    /*Essentials*/
    const {options3} = require('../../options/sqlite3/sqlite3.js');
    const knex = require('knex')(options3);
    const Values = require('../../server.js');
    const newArr = [];
    newArr.push(Values)
        knex('messages').insert(newArr)
            .then( () => console.log('Filas Insertadas') && knex.destroy())
            .catch(err => console.log('Ha ocurrido un error:', err) && knex.destroy()) ;
}
