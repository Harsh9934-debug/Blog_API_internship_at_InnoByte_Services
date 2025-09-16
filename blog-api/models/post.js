import mongoose from "mongoose";

const postScheme = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique:true,
        },
        desc:{
            type:String,
            required:true
        },
        photo: {
            type: String,
            required:false,
        },
        // ID of the user who authored the post (from JWT)
        authorId: {
            type: String,
            required: true,
            index: true,
        },
        // Optional display name/username; kept for compatibility and filtering
        username: {
            type: String,
            required:false
        },
        categories:{
            type: Array,
            required: false,
        },
    },
    {
        timestamps:true
    }
);

export default mongoose.model("post", postScheme);