module.exports = arr = [];
/* Instructions  */
const express = require('express');
const router = require('./Router/Router.js');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

/* Persistencia */
    /*Mongoose*/
    //  let mongoose = require('mongoose');
    //  const Mensajes = require('./models/messages.js')
    //  const Productos = require('./models/products.js')
    require('./connection');
/* Server up */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 8080);
http.listen(app.get('port'), () => { console.log('server on port',  app.get('port')); });

/* Router */
const Rutas = require('./Rutas/Routes.js');
const socket = require('socket.io');
const { table } = require('console');
const rutas = new Rutas();
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'Public')));
/* Handlebars */
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/Views/layouts",
        partialsDir: __dirname + "/Views/partials"
    })
);
app.set("view engine", "hbs");
app.set("views", "./Views");

//----------------------------------------------------------------------WebSocket-------------------------------------------------------------------------------\\
io.on('connection', (socket) => {
    console.log('alguien se está conectando');
//--------------------------------------------------------------------------------------------------------------------------------------------------------------\\
//----------------------------------------------------------------------PRODUCTOS-------------------------------------------------------------------------------\\
//--------------------------------------------------------------------------------------------------------------------------------------------------------------\\
socket.on('products:send', async (data) => {
    let value = data;
    module.exports = value;
 //FileSystem
    const fileSystem = require('./Persistencia/FileSystem/products.js');
    fileSystem();
 //Mongoose
    const productsCRUD = require('./Persistencia/Mongoose/Mongoose.js');
    productsCRUD();
 //MariaDB
    const MariaREAD = require('./Persistencia/MariaDB/productsREAD.js');
    MariaREAD()
    /*Borrar*/
    const MariaDELETE = require('./Persistencia/MariaDB/productsDELETE.js');
    /*MariaDELETE();*/
});
socket.on('products:db', (data) => {
    let value = data;
    module.exports = value;
    const MariaCREATE = require('./Persistencia/MariaDB/productsCREATE.js');
    MariaCREATE();
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------------\\
//----------------------------------------------------------------------MENSAJES--------------------------------------------------------------------------------\\
//--------------------------------------------------------------------------------------------------------------------------------------------------------------\\
socket.on('message:insert',  async (data) => {
    let Values = data;
    module.exports = Values;
 //FileSystem
    const readSystem = require('./Persistencia/FileSystem/messages.js');
    readSystem();
 //Mongoose
    const MongooseCREATE = require('./Persistencia/Mongoose/MongooseCREATE.js');
    MongooseCREATE();
    const MongooseREAD = require('./Persistencia/Mongoose/MongooseREAD.js');
    MongooseREAD();
 //Sqlite3
    const messageCREATE = require('./Persistencia/Sqlite3/messageCREATE.js');
    messageCREATE();
    
    const messageREAD = require('./Persistencia/Sqlite3/messageREAD.js');
    messageREAD();
    
    const messageDELETE = require('./Persistencia/Sqlite3/messageDELETE.js');
    messageDELETE();
        
})
    /*El cliente esta escribiendo*/
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});