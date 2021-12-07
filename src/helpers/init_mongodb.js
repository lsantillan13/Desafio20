const mongoose =  require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
mongoose
    .connect(process.env.MONGO_ATLAS_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
        //useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

mongoose.connection.once('connected', () =>{
    console.log('Mongoose connected to db.');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
