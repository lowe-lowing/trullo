import type { Request, Response } from "express";
import { prisma } from "../..";
import type { User } from "@prisma/client";
import { validationResult } from "express-validator";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

type UserBody = Pick<User, "name" | "email" | "role">;

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, email, role } = req.body as UserBody;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.send("User deleted");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
