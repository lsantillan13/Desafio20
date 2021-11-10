module.exports = async function MongooseCREATE(){
    /*Essentials*/
    let mongoose = require('mongoose');
    const Mensajes = require('../../models/messages.js')
    const Values  = require('../../server.js');
        const mensajeSaveModel = new Mensajes(Values);
        let mensajeSaved = await mensajeSaveModel.save();
}