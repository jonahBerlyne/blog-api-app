import express from "express";
import { createComment } from "../controllers/commentControllers";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/comment", auth, createComment);

export default router;