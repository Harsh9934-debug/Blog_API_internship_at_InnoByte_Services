import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });              // this is the section user in the showcase of the data in the postman doen section 
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

export default router;