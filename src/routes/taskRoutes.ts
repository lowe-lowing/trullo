import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task/taskControllers";
import { validateTask } from "../controllers/task/validators";

const router = express.Router();

router.get("/", getTasks);
router.post("/:projectId", validateTask, createTask);
router.patch("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;
