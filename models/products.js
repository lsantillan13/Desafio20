const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productsSchema = new Schema({
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true, default: 0},
    image: {type: String, require: true, max:100}
});
module.exports = mongoose.model("Productos", productsSchema);