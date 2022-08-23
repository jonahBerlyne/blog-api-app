import express from "express";
import { createComment, getComments, replyComment } from "../controllers/commentControllers";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/comment", auth, createComment);
router.get("/comments/blog/:id", getComments);
router.post("/reply_comment", auth, replyComment);

export default router;