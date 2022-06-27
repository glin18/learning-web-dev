const mongoose = require("mongoose");
const Product = require('./product');

const farmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ]
})

farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } });
        console.log(res);
    }
})

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;

