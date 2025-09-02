const express = require ("express")
const app = express();
const dotenv = require("dotenv")
const mongoose =  require ("mongoose")
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected "))
    .catch((err) => console.error("MongoDB connection error ", err));

app.listen("5000",()=>{
    console.log ("Backend is running")
})