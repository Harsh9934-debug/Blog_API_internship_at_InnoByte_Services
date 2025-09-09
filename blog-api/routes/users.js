const router = require("express").Router();
const user = require("../models/user");
// Register
    router.post("/register",async (req,res) =>{
        try{

        }catch(err){
            res.status(500).json(err);
        }
    })

module.exports = router;