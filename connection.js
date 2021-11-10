const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/ecommerce';
const db = mongoose.connection;
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000
})
    .catch(err => console.log(err));

db.once('open', _ => {
    console.log('Database is connected to:', URI)
})

db.on('error', err => {
    console.log(err)
})