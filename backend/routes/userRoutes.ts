import express from "express";
import { updateUser } from "../controllers/userControllers";
import auth from '../middleware/auth';

const router = express.Router();

router.patch('/user', auth, updateUser);

export default router;