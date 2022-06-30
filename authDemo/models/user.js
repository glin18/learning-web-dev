const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    pandas: {
        type: Number,
        default: 1,
        minimum: 0
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;