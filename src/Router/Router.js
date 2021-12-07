//--------------------------------------------------------------------IMPORTS---------------------------------------------------------------------------------\\
const express = require('express')
const Rutas = require('../Rutas/Routes.js');
const router = express.Router();
// const {
//   find,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require('../controllers/productos.controller.js');

/*const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require ('../Rutas/Rutas.js');
*/
const rutas = new Rutas();

//--------------------------------------------------------------------Rutas-----------------------------------------------------------------------------------\\
//-----------------/*CODE*/-----------------------------------------Productos-------------------------------------------/*Notes*/-----------------------------\\
/**/ router                                                                                                                                                  /**/
/**/ .get('/productos/vista', rutas.vistas)                                                                        // => UI de Productos                     /**/
/**/ .post('/productos/guardar', function(req,res){createProduct})                                                 //  Create                                /**/
/**/ .get('/productos/listar', function(req,res){find})                                                     //  Read                                  /**/
/**/ .get('/productos/listar/:id', function(req,res){getProducts})                                                 //  Read                                  /**/
/**/ .put('/productos/actualizar/:id', function(req,res){updateProduct})                                           //  Update                                /**/
/**/ .delete('/productos/borrar/:id', function(req,res){deleteProduct})                                            //  Delete                                /**/

/**/ .get('/productos/vista-test', rutas.faker)                                                                    // => UI de Fakerjs                       /**/
/**/                                                                                                                                                         /**/
//-------------------------------------------------------------------Carrito----------------------------------------------------------------------------------\\
/**/                                                                                                                                                         /**/
/**/ //router.get('/carrito', ruta.funcion)                                                                        // => UI de Carrito                       /**/
/**/ module.exports = router;                                                                                                                                /**/ 
/**/                                                                                                                                                         /**/
