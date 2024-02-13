import { UserInterface } from "./user.interface";
import { prisma } from "../../dbconn";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { isValidEmail } from "../helpers";
import { Request, Response } from "express";

// https://plainenglish.io/blog/typed-express-request-and-response-with-typescript
// https://dev.to/joshtom/build-a-rest-api-with-prisma-node-js-and-typescript-36o


export async function createNewUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const salt: number = 10;
    const { username, password, email } = req.body;

    // Can avoid this validation with a middleware
    if (!username || !password || !email) {
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ error: "Invalid request" });
    }

    if (!isValidEmail(email)) {
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ error: "Invalid email" });
    }

    const passwordHash = await bcrypt.hash(password, salt);
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      res.status(StatusCodes.CONFLICT);
      res.json({ error: "User already exist" });
      return;
    }

    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: passwordHash,
      },
    });

    res.status(StatusCodes.OK);
    res.json({ sucess: "User created successfully" });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const email: string = req.body.email;
    if (!email) {
      res.status(StatusCodes.BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    res.json({ user: user });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const email: string = req.body.email;

    if (isValidEmail(email) && email !== undefined) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          username: req.body.username,
        },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    res.json({ error: error });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const email: string = req.body.email;
    if (isValidEmail(email) && email !== undefined) {
      const user = await prisma.user.delete({
        where: {
          email: email,
        },
      });
      res.json({ user: user });
    }

    res.status(StatusCodes.OK).json({ message: "User succefully deleted" });
  } catch (error) {
    res.json({ error: error });
  }
}
