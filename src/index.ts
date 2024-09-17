import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import { adminMiddleware, authMiddleware } from "./middlewares";
import authRouter from "./routes/authRoutes";
import profileRouter from "./routes/profileRoutes";
import projectRouter from "./routes/projectRoutes";
import taskRouter from "./routes/taskRoutes";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());

export const prisma = new PrismaClient();

app.use("/", authRouter);
app.use("/users", authMiddleware, adminMiddleware, userRouter);
app.use("/profile", authMiddleware, profileRouter);
app.use("/projects", authMiddleware, projectRouter);
app.use("/tasks", authMiddleware, taskRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// TODO: add a ProjectMembers table to store the many-to-many relationship between projects and users
// TODO: add invite functionality to projects
// TODO: add tags to tasks with a many-to-many relationship (users should be able to create custom tags)

// const validateUser = [
//   body("username")
//     .isString()
//     .withMessage("Username must be a string")
//     .isLength({ min: 3 })
//     .withMessage("Username must be at least 3 characters long"),
//   body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
//   body("password")
//     .isString()
//     .withMessage("Password must be a string")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),
// ];

// app.post("/users", validateUser, async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       },
//     });
//     res.status(201).send(newUser);
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// });
