import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import authRouttes from './routes/authRoutes.js';
import { errorHandler } from "./middleware/errorHandler.js";
import expenseRoute from './routes/expenseRoute.js'


const app = express();

app.use(express.json());

const PORT = process.env.PORT||3000;

app.use(cors({
    origin: "http://localhost:4200", // Angular app
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// app.use(cors({
//   origin: '*', // allow all for testing
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected",process.env.MONGO_URI))
.catch(err => console.log("MongoDB connection error:", err));



app.use('/api/auth',authRouttes);
app.use('/api/expense',expenseRoute);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
  });


