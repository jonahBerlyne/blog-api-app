import express from "express";
import { createBlog, getBlogsByCategory, getHomeBlogs } from "../controllers/blogControllers";

const router = express.Router();

router.post('/blog', createBlog);
router.get('/home/blogs', getHomeBlogs);
router.get('/blogs/:category_id', getBlogsByCategory);

export default router;