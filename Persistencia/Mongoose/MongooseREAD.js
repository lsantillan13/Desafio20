module.exports = async function MongooseREAD(){
    let mongoose = require('mongoose');
    const Mensajes = require('../../models/messages.js')
    let allMessages = await Mensajes.find()
    console.log('Mongoose listando Mensajes:', allMessages);
}
