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
