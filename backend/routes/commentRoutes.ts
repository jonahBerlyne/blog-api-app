import express from "express";
import { createComment, getComments, replyComment, updateComment, deleteComment } from "../controllers/commentControllers";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/comment", auth, createComment);
router.get("/comments/blog/:id", getComments);
router.post("/reply_comment", auth, replyComment);
router.patch("/comment/:id", auth, updateComment);
router.delete("/comment/:id", auth, deleteComment);

export default router;