import express from "express";

import {
 register
} from "../controllers/authController";
import { validRegister } from "../middleware/validator";

const router = express.Router();

router.post("/register", validRegister, register);

export default router;