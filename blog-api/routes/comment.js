const express = require("express")
const router = express.Router();
const comment = require("../models/comment")

router.post("/",async (req, res) =>{
    try{
        
    }catch(err){
        res.status(500).json("Error occured")
    }
})