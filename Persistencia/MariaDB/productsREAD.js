module.exports = function MariaREAD(){
    /*Essentials*/
    const {options} = require('../../options/mariaDB');
    const socket = require('socket.io');
    const knex = require('knex')(options);
            knex.select('*').from('productos')
            .then((rows) => console.log('MariaDB Listando Rows:', rows) && socket.emit('products:receive', rows))
            .catch((err) => {console.log(err); throw err})
};