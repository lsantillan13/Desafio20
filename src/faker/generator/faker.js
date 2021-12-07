const faker = require('faker');
faker.locale = 'es';

const get = () => ({
    title: faker.commerce.productName(),
    image: faker.image.avatar(),
    price: faker.commerce.price(),
})


module.exports = {
    get
}