import { body } from "express-validator";

export const validateRegister = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLogin = [body("email"), body("password")];
