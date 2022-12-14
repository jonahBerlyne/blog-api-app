import express from "express";

import {
 activateAccount,
 forgotPassword,
 login,
 loginSMS,
 logout,
 refreshToken,
 register,
 verifySMS
} from "../controllers/authController";
import auth from "../middleware/auth";
import { validRegister } from "../middleware/validator";

const router = express.Router();

router.post("/register", validRegister, register);
router.post("/activate", activateAccount);
router.post("/login", login);

router.get("/logout", auth, logout);
router.get("/refresh_token", refreshToken);

router.post("/login_sms", loginSMS);
router.post("/verify_sms", verifySMS);
router.post("/forgot_password", forgotPassword);

export default router;