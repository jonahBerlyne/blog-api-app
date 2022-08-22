import express from "express";
import { createBlog, getBlogsByCategory, getBlogsByUser, getHomeBlogs } from "../controllers/blogControllers";

const router = express.Router();

router.post('/blog', createBlog);
router.get('/home/blogs', getHomeBlogs);
router.get('/blogs/category/:id', getBlogsByCategory);
router.get('/blogs/user/:id', getBlogsByUser);

export default router;