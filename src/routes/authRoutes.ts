import express from "express";
import { login, logout, register } from "../controllers/auth/authControllers";
import { validateRegister, validateLogin } from "../controllers/auth/validators";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
