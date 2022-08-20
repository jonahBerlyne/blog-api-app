import express from "express";

import {
 activateAccount,
 facebookLogin,
 googleLogin,
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
router.post("/google_login", googleLogin);
router.post("/facebook_login", facebookLogin);

export default router;