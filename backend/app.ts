import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoute from "./routes/authRoute";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", authRoute);

const PORT = process.env.PORT || 5000;

const mongoDB = process.env.MONGO_URI;
mongoose.connect(`${mongoDB}`)
        .then(() => {
         app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
        })
        .catch(err => console.log(`MongoDB connection error: ${err}`));
