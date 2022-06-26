const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farm' }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;