import express from "express";
import { resetPassword, updateUser } from "../controllers/userControllers";
import auth from '../middleware/auth';

const router = express.Router();

router.patch('/user', auth, updateUser);
router.patch('/reset_password', auth, resetPassword);

export default router;