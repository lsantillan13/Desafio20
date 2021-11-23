//--------------------------------------------------------------------Instructions-----------------------------------------------------------------------------\\
/**/ module.exports = arr = [];                                                                                                                              /**/
/**/ const express = require('express');                                                                                                                     /**/
/**/ const router = require('./Router/Router.js');                                                                                                           /**/
/**/ const handlebars = require('express-handlebars');                                                                                                       /**/
/**/ const path = require('path');                                                                                                                           /**/
/**/ const app = express(); module.exports = app;                                                                                                            /**/
/**/ const http = require('http').Server(app);                                                                                                               /**/
/**/ const io = require('socket.io')(http);                                                                                                                  /**/
/**/ const PORT = process.env.PORT || 8080;                                                                                                                  /**/
/**/ const util = require('util');                                                                                                                           /**/
/**/ const {normalize, schema} = require('normalizr');                                                                                                       /**/
//----------------------------------------------------------------------Server Up------------------------------------------------------------------------------\\
/**/ app.use(express.json());                                                                                                                                /**/
/**/ app.use(express.urlencoded({extended: true}))                                                                                                           /**/
/**/ app.set('port', process.env.PORT || 8080);                                                                                                              /**/
/**/                                                                                                                                                         /**/
//----------------------------------------------------------------------Router---------------------------------------------------------------------------------\\
/**/ const Rutas = require('./Rutas/Routes.js');                                                                                                             /**/
/**/ const socket = require('socket.io');                                                                                                                    /**/
/**/ const rutas = new Rutas();                                                                                                                              /**/
/**/ app.use('/api', router);                                                                                                                                /**/
/**/ app.use(express.static(path.join(__dirname, 'Public')));                                                                                                /**/
/**/                                                                                                                                                         /**/
//--------------------------------------------------------------------DBConnection-----------------------------------------------------------------------------\\
/**/ const DbConnection = require('./models/persistence/finalClass.js');                                                                                     /**/
/**/ const db = new DbConnection(process.env.ACTIVE_PERSISTENCE);                                                                                            /**/
/**/ http.listen(PORT, () => {                                                                                                                               /**/
/**/  console.log(`Servidor escuchando en el puerto ${PORT}`);                                                                                               /**/
/**/  db.instance                                                                                                                                            /**/
/**/    .inicializateSchemas()                                                                                                                               /**/
/**/    .then((response) => console.log(response))                                                                                                           /**/
/**/    .catch((err) => console.log(err.message));                                                                                                           /**/
/**/ });                                                                                                                                                     /**/
/**/ http.on('error', (error) => console.log('Error en el Servidor', error));                                                                                /**/
/**/ module.exports = db.instance;                                                                                                                           /**/
/**/                                                                                                                                                         /**/
//------------------------------------------------------------------------HBS----------------------------------------------------------------------------------\\
/**/ app.engine(                                                                                                                                             /**/
/**/  "hbs",                                                                                                                                                 /**/
/**/  handlebars({                                                                                                                                           /**/
/**/    extname: ".hbs",                                                                                                                                     /**/
/**/    defaultLayout: 'index.hbs',                                                                                                                          /**/
/**/    layoutsDir: __dirname + "/Views/layouts",                                                                                                            /**/
/**/    partialsDir: __dirname + "/Views/partials"                                                                                                           /**/
/**/  })                                                                                                                                                     /**/
/**/ );                                                                                                                                                      /**/
/**/ app.set("view engine", "hbs");                                                                                                                          /**/
/**/ app.set("views", "./Views");                                                                                                                            /**/
/**/                                                                                                                                                         /**/
//----------------------------------------------------------------------WebSocket------------------------------------------------------------------------------\\
//----------------------------------------------------------------------PRODUCTOS------------------------------------------------------------------------------\\
/**/ io.on('connection', (socket) => { console.log('alguien se está conectando');                                                                            /**/
/**/ socket.on('products:send', (data) => {                                                // data => Product to UI                                          /**/
/**/  arr.push(data); console.log(arr)                                                                                                                       /**/
/**/  socket.emit('products:resend', arr, data);                                                                                                             /**/
/**/ });                                                                                                                                                     /**/
/**/  socket.on('products:db', (data) => { })                                              // data => Product = {title: 'lorem', image: 'lorem' };           /**/
/**/                                                                                                                                                         /**/
//----------------------------------------------------------------------WebSocket------------------------------------------------------------------------------\\
//----------------------------------------------------------------------MENSAJES-------------------------------------------------------------------------------\\
/**/ socket.on('message:insert',  (data) => { io.emit('message:send', data) })             // data => Message = {usuario: 'mail', mensaje: 'lorem' }         /**/
/**/ socket.on('chat:typing', (data) => { socket.broadcast.emit('chat:typeado', data); }); // data => @Usuario esta escribiendo...                           /**/
socket.on('datos', (data) => {
    const resultado = data;
    const authorSchema = new schema.Entity('author', {idAttribute: '1000'});
    const messagesSchema = new schema.Entity('messages');
    const postSchema = new schema.Entity('Post',{
     author: authorSchema,
     messages: [messagesSchema]
    });

    const normalizedMessages = normalize(resultado, postSchema);
    function print(objeto){console.log(util.inspect(objeto,false,12,false))};
    print(normalizedMessages);
    console.log('Longitud antes de normalizar:', JSON.stringify(resultado).length);
    console.log('Longitud despues de normalizar:', JSON.stringify(normalizedMessages).length)
})

/**/ });                                                                                                                                                     /**/
/**/                                                                                                                                                         /**/
//----------------------------------------------------------------------Normalizr------------------------------------------------------------------------------\\


/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/
/**/                                                                                                                                                         /**/