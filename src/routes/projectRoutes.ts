import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectsByUser,
  addMember,
  getProjectWithTasks,
} from "../controllers/project/projectControllers";
import { validateProject } from "../controllers/project/validators";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectWithTasks);
router.get("/user", getProjectsByUser);
router.post("/", validateProject, createProject);
router.patch("/:id", validateProject, updateProject);
router.delete("/:id", deleteProject);
router.get("/:projectId/addMember/:userId", addMember);

export default router;
