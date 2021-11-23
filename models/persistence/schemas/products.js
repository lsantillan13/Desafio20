const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const findOrCreate = require('mongoose-findorcreate');

const ProductsSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	description: String,
	code: String,
	image: String,
	price: String,
	stock: String,
	timestamp: Date,
});

//ProductsSchema.plugin(findOrCreate);

module.exports = mongoose.model('products', ProductsSchema);
