import express from "express";

import {
 activateAccount,
 register
} from "../controllers/authController";
import { validRegister } from "../middleware/validator";

const router = express.Router();

router.post("/register", validRegister, register);
router.post("/activate", activateAccount);

export default router;