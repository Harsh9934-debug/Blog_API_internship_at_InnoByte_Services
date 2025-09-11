import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
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

        const token = jwt.sign(
            { id: user._id.toString(), username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const { password, ...userWithoutPassword } = user._doc ?? user.toObject?.() ?? {};
        res.status(200).json({ user: userWithoutPassword, token });
    } catch (err) {
        res.status(500).json("Error occurred");
    }
});

export default router;