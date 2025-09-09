import express from "express";
const router = express.Router();
import Category from "../models/category.js";

router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json("Error occurred");
    }
});

export default router;