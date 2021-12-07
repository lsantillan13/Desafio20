//--------------------------------------------------------------------IMPORTS---------------------------------------------------------------------------------\\
/**/ const arr = require('../server.js');
     const response = require('../models/server/response.js');                                                                                                                      /**/
/**/ let id = 0;                                                                                                                                             /**/
/**/                                                                                                                                                         /**/
//--------------------------------------------------------------------Function--------------------------------------------------------------------------------\\
//--------------------------------------------------------------------Get Prods-------------------------------------------------------------------------------\\
function getProducts (req, res){                                                                                                            
 arr.length === 0 ? res.json('No hay productos') : res.json(arr) };
 module.exports.getProducts = getProducts;                                                                                                            /**/
//--------------------------------------------------------------------Function--------------------------------------------------------------------------------\\
//--------------------------------------------------------------------GetById---------------------------------------------------------------------------------\\
/**/ async function getProductsId(req, res, next) {                                                                                                           /**/
/**/ try{                                                                                                                                                    /**/
/**/  let params = req.params;                                                                                                                               /**/
/**/  let id = params.id;                                                                                                                                    /**/
/**/  let i = id;                                                                                                                                            /**/
/**/  id == arr[i].id ? res.json(arr[i]) : res.json({ Error: 'Producto no encontrado' })                                                                     /**/
/**/ }catch(error){console.log(error)};                                                                                                                             /**/
/**/ };                                                                                                                                                      /**/
/**/                                                                                                                                                         /**/
/**/ module.exports.getProductsId = getProductsId;                                                                                                           /**/
//--------------------------------------------------------------------Function--------------------------------------------------------------------------------\\
//-------------------------------------------------------------------Create Prod------------------------------------------------------------------------------\\    
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
async function createProduct(req, res, next) {
    try{
        const {name, description, code, image, price, stock} = req.body;
        const newProduct = new Producto({
            name,
            description,
            code,
            image,
            price,
            stock,
            id: id++,
        })
        arr.push(productoNuevo);
        res.send(productoNuevo);
    }catch(error){next(error);};
};
module.exports.createProduct = createProduct;
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
async function updateProduct(req, res, next) {
    try{
        let body = req.body;
        let {id} = req.params;
        const buscar = arr.find(producto => producto.id == id)
        if (buscar === undefined) {res.send({msj: "El producto no existe"})}
            else {
            buscar["title"] = body["title"];
            buscar["price"] = body["price"];
            buscar["thumbnail"] = body["thumbnail"];
            res.send({Msj: 'Producto actualizado', producto: arr[id] })
        }
    }catch(error){next(error)};
};
module.exports.updateProduct = updateProduct;
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
async function deleteProduct(req, res, next) {
    try{
    let { id } = req.params;
    const buscar = arr.find(producto => producto.id == id)
    if (buscar === undefined) {res.send({ msj: "El producto no existe" })}
    else {
        arr = arr.filter(producto => producto.id != id);
        res.send(buscar);
    }}catch(error){next(error)};
};
module.exports.deleteProduct = deleteProduct;
/**/                                                                                                                                                         /**/



/*vistas(req, res){
      const fakeAPI = () => { return arr };
      let msj = {Productos: fakeAPI(), listExist: arr.length != 0 ? true : false}
      res.render('main', msj);
    };
*/
