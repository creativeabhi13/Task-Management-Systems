import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
        });
        console.log("MongoDB connected successfully With CRM");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
    }
    };

export default connectDB;