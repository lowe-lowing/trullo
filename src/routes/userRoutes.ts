import express from "express";
import { deleteUser, getUsers, updateUser } from "../controllers/user/userControllers";
import { validateUser } from "../controllers/user/validators";

const router = express.Router();

router.get("/", getUsers);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
