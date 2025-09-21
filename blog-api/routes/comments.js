import express from "express";
const router = express.Router();
import Comment from "../models/comment.js";
import { verifyToken } from "../middleware/auth.js";
import { validateCreateComment, validateUpdateComment } from "../middleware/validation.js";

// Create comment
router.post("/", verifyToken, validateCreateComment, async (req, res) => {
    try {
        const newComment = new Comment({
            ...req.body,
            authorId: req.user.id,
        });
        const saved = await newComment.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update comment
router.put("/:id", verifyToken, validateUpdateComment, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json("Comment not found");
        if (comment.authorId !== req.user.id) {
            return res.status(403).json("Not authorized to update this comment");
        }
        const updated = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete comment
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json("Comment not found");
        if (comment.authorId !== req.user.id) {
            return res.status(403).json("Not authorized to delete this comment");
        }
        await comment.deleteOne();
        res.status(200).json("Comment has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all comments (public)
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get comments by postId (public)
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single comment (public) - MUST be after other specific routes
router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json("Comment not found");
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
