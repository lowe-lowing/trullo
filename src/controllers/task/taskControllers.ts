import type { Request, Response } from "express";
import { prisma } from "../..";
import { validationResult } from "express-validator";
import type { Task } from "@prisma/client";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const tasks = await prisma.task.findMany({ where: { projectId } });
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

type TaskBody = Pick<Task, "title" | "description" | "assignedToId" | "projectId" | "finishedBy" | "status">;

export const createTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const projectId = parseInt(req.params.projectId);
  const { title } = req.body as TaskBody;

  const newTask = await prisma.task.create({
    data: {
      title,
      projectId,
      description: "",
      assignedToId: null,
      status: "to_do",
      finishedBy: null,
    },
  });
  res.status(201).send(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = parseInt(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });
    const { title, description, assignedToId, finishedBy, status } = req.body as TaskBody;

    await prisma.task.update({
      where: { id },
      data: { title, description, assignedToId, finishedBy, status },
    });
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.task.delete({ where: { id } });
    res.send("Task deleted");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
