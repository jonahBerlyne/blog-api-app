import express from "express";
import { createBlog } from "../controllers/blogControllers";

const router = express.Router();

router.post('/blog', createBlog);

export default router;