import type { User } from "@prisma/client";
import type { Request } from "express";

// Extend the Express Request interface to include a `user` property
declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Add an optional user property
  }
}
