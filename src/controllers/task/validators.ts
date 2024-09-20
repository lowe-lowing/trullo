import type { Status } from "@prisma/client";
import { body } from "express-validator";

export const validateTask = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters long"),
  body("description")
    .isString()
    .withMessage("description must be a string")
    .isLength({ min: 3 })
    .withMessage("description must be at least 3 characters long"),
  body("assignedToId").optional().isNumeric().withMessage("assignedToId must be a number"),
  body("status")
    .optional()
    .isString()
    .withMessage("status must be a string")
    .isIn(["to_do", "in_progress", "done"] as Status[])
    .withMessage("status must be one of 'to_do', 'in_progress', 'done'"),
  body("finishedBy").optional().isISO8601().withMessage("finishedBy must be a date"),
  body("tags").optional().isArray().withMessage("tags must be an array"),
];
