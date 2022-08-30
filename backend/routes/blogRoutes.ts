import express from "express";
import { createBlog, deleteBlog, getBlog, getBlogsByCategory, getBlogsByUser, getHomeBlogs, searchBlogs, updateBlog } from "../controllers/blogControllers";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/blog', createBlog);
router.get('/home/blogs', getHomeBlogs);
router.get('/blogs/category/:id', getBlogsByCategory);
router.get('/blogs/user/:id', getBlogsByUser);
router.get('/blog/:id', getBlog);
router.put('/blog/:id', auth, updateBlog);
router.delete('/blog/:id', auth, deleteBlog);
router.get('/search/blogs', searchBlogs);

export default router;