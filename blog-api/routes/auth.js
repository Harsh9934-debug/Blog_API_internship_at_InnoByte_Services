import express from "express";
const router = express.Router();
import User from "../models/user.js";

// Test route to verify endpoint is working
router.get("/register", (req, res) => {
    res.json({ message: "Register endpoint is working!" });
});

router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router;