module.exports = function MariaDELETE(){
    /*Essentials*/
    const {options} = require('../../options/mariaDB');
    const knex = require('knex')(options);
        knex.from('productos').del()
        .then(() => console.log('products succesfully deleted'))
        .catch((err) => {console.log(err); throw err})
}
