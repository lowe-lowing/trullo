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

export const getProjectWithTasks = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const project = await prisma.project.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.send(project);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getProjectsByUser = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: req.user!.id,
          },
        },
      },
    });
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
        members: {
          create: {
            userId: req.user!.id,
          },
        },
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
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const { title } = req.body as ProjectBody;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { title },
    });
    res.send(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { projectId, userId } = req.params;
    const isUserMember = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          projectId: parseInt(projectId),
          userId: req.user!.id,
        },
      },
    });
    if (!isUserMember) {
      return res.status(403).json({ error: "You are not a member of this project" });
    }
    const project = await prisma.project.findUnique({ where: { id: parseInt(projectId) } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isUserAlreadyMember = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          projectId: parseInt(projectId),
          userId: parseInt(userId),
        },
      },
    });
    if (isUserAlreadyMember) {
      return res.status(400).json({ error: "User is already a member of this project" });
    }
    await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        members: {
          create: {
            userId: parseInt(userId),
          },
        },
      },
    });

    res.send("Member added");
  } catch (error) {
    console.log(error);

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
