// A file for anytime I just want some new data in my database

const Product = require("./models/product");
const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("Connection is successful!");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
}

// const p = new Product({
//     name: "Grapefruit",
//     price: "1.99",
//     cateogry: "fruit"
// })

// p.save()
//     .then((d) => {
//         console.log(d);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

const seedProducts = [
    {
        name: 'Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts).then(res => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})
