import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Test route to verify endpoint is working
router.get("/register", (req, res) => {
    res.json({ message: "Register endpoint is working!" });
});

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// this is for the login route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }
        res.status(200).json(user);
    } catch (err) {
    }
});



export default router;