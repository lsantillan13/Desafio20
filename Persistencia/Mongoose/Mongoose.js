module.exports = async function productsCRUD(){
/*essentials*/
const Productos = require('../../models/products.js')
const value = require('../../server');
    /*Create*/
        const productoSaveModel = new Productos(value);
        let productoSaved = await productoSaveModel.save();
        console.log('Mongoose producto Guardado:', productoSaved);
    /*Read*/
    let allProducts = await Productos.find()
    console.log('Mongoose listando Productos:', allProducts);
}