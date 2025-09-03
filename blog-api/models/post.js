const { timeStamp } = require("console");
const mongoose = require("mongoose")

const postScheme = new mongoose.Schema(
    {
        title:{
            
        }
    },{
        timeStamp:true
    }
);

module.exports = mongoose.model("post", postScheme);