const v4 = require('uuid')

module.exports = class Producto {
	constructor(name, description, code, image, price, stock) {
		this.id = v4();
		this.timestamp = Date.now();
		this.name = name;
		this.description = description;
		this.code = code;
		this.image = image;
		this.price = price;
		this.stock = stock;
	}
}
