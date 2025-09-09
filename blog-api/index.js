import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/post.js";
import categoriesRoute from "./routes/categories.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected "))
    .catch((err) => console.error("MongoDB connection error ", err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoriesRoute);


app.listen("5000",()=>{
    console.log ("Backend is at port 5000")
})