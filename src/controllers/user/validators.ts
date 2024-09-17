import type { Role } from "@prisma/client";
import { body } from "express-validator";

export const validateUser = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("role")
    .isString()
    .withMessage("role must be a string")
    .isIn(["Admin", "Default"] as Role[])
    .withMessage("role must be one of 'Admin', 'Default'"),
];
