import express from "express";
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/project/projectControllers";
import { validateProject } from "../controllers/project/validators";

const router = express.Router();

router.get("/", getProjects);
router.post("/", validateProject, createProject);
router.patch("/:id", validateProject, updateProject);
router.delete("/:id", deleteProject);

export default router;
