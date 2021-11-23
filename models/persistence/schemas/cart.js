const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const findOrCreate = require('mongoose-findorcreate');

const cartSchema = new Schema({
	timestamp: Date,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'products',
		},
	],
});

//cartSchema.plugin(findOrCreate);

module.exports = mongoose.model('cart', cartSchema);