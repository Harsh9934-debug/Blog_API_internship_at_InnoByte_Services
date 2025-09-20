// this is the section for the user update and delete 
import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { verifyToken, verifyTokenAndAuthorization } from "../middleware/auth.js";

// Get user by ID
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, select: "-password" }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;