import mongoose from "mongoose";

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
        // ID of the user who authored the comment (from JWT)
        authorId: {
            type: String,
            required: true,
            index: true,
        },
        // createdAt/updatedAt handled by timestamps
    },
    { timestamps: true }
);

export default mongoose.model("comment", commentSchema);