// this is the section for the user update and delete 
import express from "express";
const router = express.Router();
import Post from "../models/post.js";
import { verifyToken } from "../middleware/auth.js";
import { validateCreatePost, validateUpdatePost } from "../middleware/validation.js";

// Create a post
router.post("/", verifyToken, validateCreatePost, async (req, res) => {
    try {
        const newPost = new Post({
            ...req.body,
            authorId: req.user.id,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a post
router.put("/:id", verifyToken, validateUpdatePost, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json("Post not found");

        if (post.authorId !== req.user.id) {
            return res.status(403).json("Not authorized to update this post");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json("Post not found");

        if (post.authorId !== req.user.id) {
            return res.status(403).json("Not authorized to delete this post");
        }

        await post.deleteOne();
        res.status(200).json("Post has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json("Post not found");
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all posts
router.get("/", async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (categoryName) {
            posts = await Post.find({ categories: { $in: [categoryName] } });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;