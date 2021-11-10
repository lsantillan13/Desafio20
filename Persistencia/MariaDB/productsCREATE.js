module.exports = function MariaCREATE(){
    /*Essentials*/
    const {options} = require('../../options/mariaDB.js');
    const value = require('../../server.js');
    const knex = require('knex')(options);
    const newArr = [];
    newArr.push(value)
        knex('productos').insert(newArr)
            .then( () => console.log('Filas Insertadas') && knex.destroy())
            .catch(err => console.log('Ha ocurrido un error:', err) && knex.destroy()) ;
}
