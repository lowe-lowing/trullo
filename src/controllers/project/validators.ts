import { body } from "express-validator";

export const validateProject = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters long"),
];
