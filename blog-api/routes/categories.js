import express from "express";
const router = express.Router();
import Category from "../models/category.js";
// this is used for creating all the categories
router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json("Error occurred");
    }
});

// this is used for getting all the categories
router.get("/",async (req,res) =>{
    try{
        const cats = await Category.find();
        res.status(200).json(cats)
    }catch(err){
        res.status(500).json("Error occurred")
    }
})

// this is used for getting a specific category by ID
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json("Category not found");
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json("Error occurred");
    }
});

export default router;