import type { Request, Response } from "express";
import { prisma } from "../..";
import { validationResult } from "express-validator";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.send(projects);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

interface ProjectBody {
  title: string;
}

export const createProject = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title } = req.body as ProjectBody;

    const newProject = await prisma.project.create({
      data: {
        title,
        userId: req.user!.id,
      },
    });
    res.status(201).send(newProject);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = parseInt(req.params.id);
    const project = await prisma.project.findUnique({ where: { id } });
    const { title } = req.body as ProjectBody;

    await prisma.project.update({
      where: { id },
      data: { title },
    });
    res.send(project);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.project.delete({ where: { id } });
    res.send("Project deleted");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
