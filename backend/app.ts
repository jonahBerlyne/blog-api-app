import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketServer } from './config/socket';

import authRoute from "./routes/authRoutes";
import blogRoute from "./routes/blogRoutes";
import categoryRoute from "./routes/categoryRoutes";
import commentRoute from "./routes/commentRoutes";
import userRoute from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const http = createServer(app);
export const io = new Server(http);

io.on('connection', (socket: Socket) => SocketServer(socket));

app.use("/api", authRoute);
app.use("/api", blogRoute);
app.use("/api", categoryRoute);
app.use("/api", commentRoute);
app.use("/api", userRoute);

const PORT = process.env.PORT || 5000;

const mongoDB = process.env.MONGO_URI;
mongoose.connect(`${mongoDB}`)
        .then(() => {
         http.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
        })
        .catch(err => console.log(`MongoDB connection error: ${err}`));