import express from "express";

import {
 activateAccount,
 login,
 logout,
 refreshToken,
 register
} from "../controllers/authController";
import { validRegister } from "../middleware/validator";

const router = express.Router();

router.post("/register", validRegister, register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", refreshToken);

export default router;