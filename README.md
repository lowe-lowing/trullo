# Trullo Project

## Introduction

This is a simple task management app I built using Node.js, Express, and Prisma with a PostgreSQL database. It allows users to create projects, add tasks, and manage them. There are two different user roles Admin and Default, only admins can manage users.

## Why I Chose PostgreSQL

- Easy to Use: I find it straightforward to set up and use, especially with Prisma.
- Supports Relationships: The app needs to handle relationships between users, projects, and tasks, and PostgreSQL is good for that.
- Free and Reliable: It’s free and has a good reputation for reliability, so I can trust it for my app.
- Supports Enums which I wanted to use for Status and Role properties

## Tools and Packages Used

### Here are the tools and npm packages I used and what they do:

- Node.js: Used to run the backend of the app.
- Express: A web framework for Node.js, helps in setting up routes and handling requests.
- Prisma: An ORM tool that makes it easy to work with the database. I used it to define my database models and perform queries.
- PostgreSQL: The database where all the user, project, and task data is stored.
- bcrypt: For hashing passwords before saving them, to keep them secure.
- jsonwebtoken: For creating and verifying tokens to handle user authentication.
- express-validator: To validate and sanitize user inputs, making sure they are correct and safe.
- cookie-parser: To parse cookies, which I use to store session data.

### DevDependencies (For Development Only)

- @types/ packages\*: These provide TypeScript definitions for different packages, making coding easier.
- prisma: This is needed for running Prisma commands during development.

## How the App Works

- User Authentication: Users can sign up and log in. Passwords are hashed using bcrypt, so they’re stored securely.
- Role Management: Admins can manage users, but regular users can only see and manage their own tasks and projects.
- Project and Task Management: Users can create projects and add tasks to them. They can also assign tasks to themselves or other users.
- Project Member Invitation: Members are handled by a many-to-many relationship which makes it possible to have multiple members of a project where members of a project can invite other users.
- Data Validation: All user inputs, like creating a new user or adding a task, are checked to make sure they are valid.

## App Structure

- Models: Defined in Prisma for User, Task, Project, and ProjectMember.
- Routes:
  - / for authentication like login and signup.
  - /users for managing users (only for admins).
  - /profile for user profile-related actions.
  - /projects for managing projects.
  - /tasks for managing tasks.

### Middlewares

- authMiddleware: Checks if the user is logged in.
- adminMiddleware: Checks if the user is an admin before allowing access to certain routes.

### To install dependencies:

```bash
bun install
```

or

```bash
npm install
```

### To run:

```bash
bun run .src/index.ts
```

or

```bash
npm run start
```

This project was created using `bun init` in bun v1.1.22. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
