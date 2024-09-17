import { Role, type User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prisma } from ".";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (cookies && cookies.Authorization) {
    const secret = "qwe";
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as User;
      const id = verificationResponse.id;
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(403).json({ message: "Authentication token is invalid, no user found" });
      }
    } catch (error) {
      res.status(403).json({ message: "Authentication token is invalid, something went wrong" });
    }
  } else {
    res.status(403).json({ message: "Authentication token missing" });
  }
};

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === Role.Admin) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
