const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilepic: {
        type: String,
        default: "",
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("user",UserScheme);