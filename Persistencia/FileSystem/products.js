//----------------------------------------------------------------------PRODUCTOS-----------------------------------------------------------------------------\\
module.exports = function fileSystem(){
/*Essentials*/
const value = require('../../server.js');
const fs = require('fs');
    /*Save*/
    const Arr = [];
    Arr.push(value)
    let newNew = Arr;
    fs.writeFileSync('./Data/productos.txt', JSON.stringify(newNew, 8, '\t'));
    console.log(`Producto ${value.title} añadido al archivo`);
};
//--------------------------------------------------------------------------------------------------------------------------------------------------------------\\
