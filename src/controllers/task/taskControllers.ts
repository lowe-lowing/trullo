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

type TaskBody = Omit<Task, "id" | "createdAt" | "projectId">;

export const createTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const projectId = parseInt(req.params.projectId);
  const { title, description, assignedToId, finishedBy, status, tags } = req.body as TaskBody;

  const newTask = await prisma.task.create({
    data: {
      title,
      projectId,
      description,
      assignedToId,
      status,
      finishedBy: finishedBy ? new Date(finishedBy) : null,
      tags,
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
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    const { title, description, assignedToId, finishedBy, status, tags } = req.body as TaskBody;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        assignedToId,
        finishedBy: finishedBy ? new Date(finishedBy) : null,
        status,
        tags,
      },
    });
    res.send(updatedTask);
  } catch (error) {
    console.log(error);

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
