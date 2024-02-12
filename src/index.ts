import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createNewUser, updateUser, deleteUser, getUser } from "./repositories/user.repository";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Test routers
app.post('/createNewUser', createNewUser);
app.get('/user', getUser);
app.post('/update-user', updateUser);
app.delete('/delete-user', deleteUser);