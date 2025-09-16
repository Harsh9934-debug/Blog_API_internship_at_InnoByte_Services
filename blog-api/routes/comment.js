const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Create a new comment
router.post("/", async (req, res) => {
    try {
        const { content, author, postId } = req.body;
        
        if (!content || !author || !postId) {
            return res.status(400).json({ 
                error: "Content, author, and postId are required" 
            });
        }

        const newComment = new Comment({
            content,
            author,
            postId,
            createdAt: new Date()
        });

        const savedComment = await newComment.save();
        res.status(201).json({
            message: "Comment created successfully",
            comment: savedComment
        });
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ error: "Error occurred while creating comment" });
    }
});

// Get all comments for a specific post
router.get("/post/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Comments retrieved successfully",
            comments
        });
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Error occurred while fetching comments" });
    }
});

// Get all comments
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "All comments retrieved successfully",
            comments
        });
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Error occurred while fetching comments" });
    }
});

// Get a specific comment by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        
        res.status(200).json({
            message: "Comment retrieved successfully",
            comment
        });
    } catch (err) {
        console.error("Error fetching comment:", err);
        res.status(500).json({ error: "Error occurred while fetching comment" });
    }
});

// Update a comment
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        
        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }
        
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        
        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        
        res.status(200).json({
            message: "Comment updated successfully",
            comment: updatedComment
        });
    } catch (err) {
        console.error("Error updating comment:", err);
        res.status(500).json({ error: "Error occurred while updating comment" });
    }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        
        res.status(200).json({
            message: "Comment deleted successfully",
            comment: deletedComment
        });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ error: "Error occurred while deleting comment" });
    }
});

module.exports = router;