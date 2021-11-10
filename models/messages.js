const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messagesSchema = new Schema({
    message: {type: String, require: true, max: 100},
    mail: {type: String, require: true, max: 100},
    fecha: {type: String, require: true, max:100}
});
module.exports = mongoose.model('Mensajes', messagesSchema);