import express from "express";
import { createBlog, getBlog, getBlogsByCategory, getBlogsByUser, getHomeBlogs } from "../controllers/blogControllers";

const router = express.Router();

router.post('/blog', createBlog);
router.get('/home/blogs', getHomeBlogs);
router.get('/blogs/category/:id', getBlogsByCategory);
router.get('/blogs/user/:id', getBlogsByUser);
router.get('/blog/:id', getBlog);

export default router;