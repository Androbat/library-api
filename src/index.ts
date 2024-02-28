import express, { Express, Request, Response } from "express";
import { createNewUser } from "./repositories/user-repository/user.repository";

import dotenv from "dotenv";
import userRouter from "./Routes/user-router/user.router";
import morgan from "morgan";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/* @User routers */
app.use("/api/users", userRouter)


// Create user handler
app.post("/api/users", createNewUser);


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}





