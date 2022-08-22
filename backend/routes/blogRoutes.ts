import express from "express";
import { createBlog, getHomeBlogs } from "../controllers/blogControllers";

const router = express.Router();

router.post('/blog', createBlog);
router.get('/home/blogs', getHomeBlogs);

export default router;