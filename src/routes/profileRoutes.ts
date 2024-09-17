import express from "express";
import { getProfile, updateProfile, updatePassword } from "../controllers/profile/profileControllers";
import { validateUpdatePassword, validateUpdateProfile } from "../controllers/profile/validators";

const router = express.Router();

router.get("/", getProfile);
router.patch("/", validateUpdateProfile, updateProfile);
router.patch("/password", validateUpdatePassword, updatePassword);

export default router;
