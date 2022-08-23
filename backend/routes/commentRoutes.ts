import express from "express";
import { createComment, getComments } from "../controllers/commentControllers";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/comment", auth, createComment);
router.get("/comments/blog/:id", getComments);

export default router;