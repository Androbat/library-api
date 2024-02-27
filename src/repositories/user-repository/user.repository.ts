import { prisma } from "../../dbconn";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { isValidEmail } from "../helpers";
import { Request, Response } from "express";
import { hashPassword } from "../helpers";

// https://plainenglish.io/blog/typed-express-request-and-response-with-typescript
// https://dev.to/joshtom/build-a-rest-api-with-prisma-node-js-and-typescript-36o

// Test controller
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

    console.log(req.body);

    if (!isValidEmail(email)) {
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ error: "Invalid email" });
    }

    const passwordHash = await hashPassword(password, salt);
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

// Test
export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      res.json({ message: "User not found" });
    }

    res.json({ user: user });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany();
    const notEmtpy = users.length === 0;
    if (!users || notEmtpy) {
      res.status(StatusCodes.NOT_FOUND);
      res.json({ error: "Empty users list" });
    }
    res.json({ users: users });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND);
  }
}

// Test update
export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const username: string = req.body.username;

    // Validate the incomind data with a middleware
    if (!username) {
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ error: "Empty data" });
    }

    if (id) {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: username,
        },
      });

      res.json({ success: "User successfully updated" });
    } else {
      res.status(StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    res.json({ error: error });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const id: string = req.params.id;

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST);
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.status(StatusCodes.OK).json({ message: "User succefully deleted" });
  } catch (error) {
    res.json({ error: error });
  }
}
