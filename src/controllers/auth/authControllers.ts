import { compare, genSalt, hash } from "bcrypt";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { prisma } from "../..";
const secret = "qwe";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body as RegisterBody;

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.status(201).send(newUser);
};

interface LoginBody {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body as LoginBody;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const validatePassword = await compare(password, user.password);
  if (!validatePassword) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(user, secret, { expiresIn: "1h" });
  res.cookie("Authorization", token, {
    maxAge: 900000,
    httpOnly: true,
  });
  res.send("Logged in");
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("Authorization");
  res.send("Logged out");
};
