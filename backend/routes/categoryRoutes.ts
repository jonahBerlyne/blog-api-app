import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryControllers';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/category', auth, createCategory);
router.get('/category', getCategories);
router.patch('/category/:id', auth, updateCategory);
router.delete('/category/:id', auth, deleteCategory);

export default router;