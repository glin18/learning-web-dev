const mongoose = require("mongoose");

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

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
