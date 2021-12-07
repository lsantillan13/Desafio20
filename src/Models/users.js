const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, unique: true, required: true,},
    name: {type: String, required: true,},
    password:{type: String},
    date: {type: Date, default: new Date()}
});

module.exports = model('User', userSchema);