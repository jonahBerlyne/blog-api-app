import express from "express";
import { createBlog, getBlog, getBlogsByCategory, getBlogsByUser, getHomeBlogs, updateBlog } from "../controllers/blogControllers";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/blog', createBlog);
router.get('/home/blogs', getHomeBlogs);
router.get('/blogs/category/:id', getBlogsByCategory);
router.get('/blogs/user/:id', getBlogsByUser);
router.get('/blog/:id', getBlog);
router.put('/blog/:id', auth, updateBlog);

export default router;