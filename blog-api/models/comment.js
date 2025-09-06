const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author_id: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("comment",commentSchema);