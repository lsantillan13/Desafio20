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
/**/ const session = require('express-session');                                                                                                             /**/
const bodyParser = require('body-parser');
//----------------------------------------------------------------------Server Up------------------------------------------------------------------------------\\
/**/ app.use(express.json());                                                                                                                                /**/
/**/ app.use(express.urlencoded({extended: true}))                                                                                                           /**/
/**/ app.set('port', process.env.PORT || 8080);                                                                                                              /**/
/**/                                                                                                                                                         /**/
//----------------------------------------------------------------------Routing--------------------------------------------------------------------------------\\
/**/ const Rutas = require('./Rutas/Routes.js');                                                                                                             /**/
/**/ const socket = require('socket.io');                                                                                                                    /**/
/**/ const rutas = new Rutas();                                                                                                                              /**/
/**/ app.use('/api', router);                                                                                                                                /**/
/**/ app.use(express.static(path.join(__dirname, 'Public')));                                                                                                /**/
/**/ app.use(session({                                                                                                                                       /**/
/**/ name: 'session-name',                                                                                                                                   /**/
/**/ secret: 'secreto',                                                                                                                                      /**/
/**/ resave: true,                                                                                                                                           /**/
/**/ saveUninitialized: true,                                                                                                                                /**/
/**/ cookie:{                                                                                                                                                /**/
/**/  expires: 60000                                                                                                                                         /**/
/**/ }                                                                                                                                                       /**/
/**/ }));                                                                                                                                                    /**/
/**/ app.use(bodyParser.urlencoded({                                                                                                                         /**/
/**/  extended: true,                                                                                                                                        /**/
/**/ }));                                                                                                                                                    /**/
/**/                                                                                                                                                         /**/
const users = [
    {id: 1, name: 'Lautaro', email: 'lautarosantillann@icloud.com', password: 'secret'},
    {id: 2, name: 'Simón', email: 'simon@mail.com', password: 'secret'},
    {id: 3, name: 'Paula', email: 'paula@mail.com', password: 'secret'},
]        
const redirectLogin = (req, res, next) =>{
    if (!req.session.userId){
        res.redirect('/login');
    }
    else{
        next()
    }
}
const loggedOut = (req, res,next ) =>{
    if (!req.session.userId){
        res.redirect('/loggedOut');
    }
    else{
        next();
    }
}

const redirectHome = (req, res, next) =>{
    if (req.session.userId){
        res.redirect('/home');
    }
    else{
        next()
    }
}

app.get('/', (req, res) => {
    const {userId} = req.session;
    res.send(`
        ${userId ? `<a href="/home">Home</a>
            <form method="post" action='/logout'>
                <button>Logout</button<
            </form>` : `<h1>Welcome</h1>
        <a href="/login">Login</a>
        <a href="/register">Register</a>`}   
    `)    
})/**/
app.get('/loggedOut', redirectLogin, (req, res) => {
    const user = users.find(user => user.id === req.session.userId)
    res.send(`
    <h1>Hasta luego ${user.name}</h1>
    `)
})
app.get('/home', redirectLogin, (req, res) => {
    const user = users.find(user => user.id === req.session.userId)
    res.send(`
    <h1> Home </home>
    <a href="/">Main</a>

    <h2>Bienvenido ${user.name}</h2>
    <ul>
        <li>Name: ${user.name}</li>
        <li>Email: ${user.email}</li>
    </ul>
    `)
});

app.get('/login', redirectHome, (req, res) => {
    // req.session.userId =
    res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
    <input type='email' name='email' placeholder='Email' require/>
    <input type='password' name='password' placeholder='Password' require/>
    <input type="submit"/>
    </form>
    <a href="/register">Register</a>
    `)
    

});
app.get('/register', (req, res) => {
    res.send(`
    <h1>Register</h1>
    <form method="post" action="/register">
    <input type="text" name="name" placeholder="name" required/>
    <input type='email' name='email' placeholder='Email' require/>
    <input type='password' name='password' placeholder='Password' require/>
    <input type="submit"/>
    </form>
    <a href="/login">Login</a>
    `)

});
app.post('/login', redirectHome, (req, res) => {
    const {email, password } = req.body;
    if( email && password){
        const user = users.find(
            user => user.email === email && user.password === password
        );
        if(user){
            req.session.userId = user.id;
            return res.redirect('/home');
        }
    }
    res.redirect('/login');


});
app.post('/register', redirectHome,(req,res) => {
    const {email, password, name } = req.body;
    if (name && email && password){
        const exists = users.some(
            user => user.email === email
        )

        if(!exists){
            const user = {
                id: users.length + 1,
                name,
                email,
                password,
            }
            users.push(user);
            console.log(users);
            req.session.userId = user.id;
            return res.redirect('/home');
        }

    }
    res.redirect('/register')

});
app.post('/logout', loggedOut, (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/home')
        }
        res.clearCookie('session-name')
        res.redirect('/login')
    })

});
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
// socket.on('login:data', (data) => {
//     app.get('/loggedIn', (req,res) => {
//         res.send(`hola ${data}`)
//     })
//     console.log(data)
// })
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