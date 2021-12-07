const arr = require('../server.js');
/*FAKERJS*/
const generador = require('../faker/generator/faker.js');
let id = 0;

module.exports = class Rutas {
    constructor(id, productos) {}
    listar(req, res) {
    arr.length === 0 ? res.json('No hay productos') :
    res.json(arr)
    };

    listarId(req, res) {
    let params = req.params;
    let id = params.id;
    let i = id;
    id == arr[i].id ? res.json(arr[i]) : res.json({ Error: 'Producto no encontrado' })
    };

    guardar(req, res) {
    let { title, price, thumbnail } = req.body;
    let productoNuevo = { title, price, thumbnail, id: id++ };
    arr.push(productoNuevo);
    res.send(productoNuevo);
    };

    actualizar(req, res) {
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
    };

    borrar(req, res) {
    let { id } = req.params;
    const buscar = arr.find(producto => producto.id == id)
    if (buscar === undefined) {res.send({ msj: "El producto no existe" })}
    else {
        arr = arr.filter(producto => producto.id != id);
        res.send(buscar);
    }};
    
    vistas(req, res){
      const fakeAPI = () => { return arr };
      let msj = {Productos: fakeAPI(), listExist: arr.length != 0 ? true : false}
      res.render('main', msj);
    };
    
    faker(req, res){
    let productos = [];
        const cant = req.query.cant || 10;
        for (let i=0; i<cant; i++){
            let producto = generador.get();
            producto.id = i +1;
            productos.push(producto);         
        }
            productos.forEach( (e) => {
                return e
            })
        cant == 0 ? res.send('No hay productos para mostrar') : res.send(productos);

        /* res.send(`
        <table>
         <thead>
          <tr>
           <th>Title</th>
           <th>Price</th>
           <th>Image</th>
          </tr>
         </thead>
         <tbody id="bodyy">
         </tbody>
        </table>
        <script language="javascript">
        let tabla = document.getElementById('bodyy');
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        tr.innerHTML += '<td>${e.title}</td> <td>${e.price}</td> <td><img src="${e.image}"></td>';
        tbody.appendChild(tr);
        tabla.appendChild(tbody);
       </script>
`); */
    }
};