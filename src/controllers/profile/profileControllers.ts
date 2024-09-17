import type { Request, Response } from "express";
import { prisma } from "../..";
import { genSalt, hash } from "bcrypt";
import { validationResult } from "express-validator";
import type { User } from "@prisma/client";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });
    res.send(profile);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, name } = req.body as Pick<User, "email" | "name">;
    const profile = await prisma.user.update({
      where: { id: req.user!.id },
      data: { email, name },
    });
    res.send(profile);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

interface UpdatePasswordBody {
  password: string;
}

export const updatePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { password } = req.body as UpdatePasswordBody;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const profile = await prisma.user.update({
      where: { id: req.user!.id },
      data: { password: hashedPassword },
    });
    res.send(profile);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
