import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utilities/db.js';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization","Cache-Control","Expires","Pragma"],
   credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

// Routes

app.use("/api", routes);

// Server setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});