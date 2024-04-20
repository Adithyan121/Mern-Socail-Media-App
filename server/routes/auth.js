import express from "express";
import { login, register, forgotPassword, validateOtp, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post('/forgot-password',forgotPassword)
router.post('/validate-otp',validateOtp)
router.post('/reset-password/',resetPassword)

export default router;
