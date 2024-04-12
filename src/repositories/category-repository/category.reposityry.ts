import { prisma } from "../../dbconn";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { isValidEmail } from "../helpers";
import { Request, Response } from "express";

// I need to be able to create a category:
// the elements the category has is a: id of the category, name, and a relationshipt between the product it has associated with.

/*
 
*/

export async function createCategory(req: Request, res: Response): Promise<void> {
  const { name } = req.body;
  console.log(name);
  try {
    if (!name || typeof name !== "string") {
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ error: `Invalid request` });
      return;
    }

    const categoryExist = await prisma.category.findFirst({ where: {name: name}  });
    if (categoryExist) {
      res.status(StatusCodes.CONFLICT);
      res.json({ error: `Category ${name} already exists` });
      return;

    }

    const createCategory = await prisma.category.create({
      data: { name: name}
    });

    console.log(createCategory)
    res.status(StatusCodes.OK);
    res.json({  message: "Category has been successfully created" });

  } catch (error) {
    // Prisma validation error is taking place
    console.log("The error is occurring here")
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ error: error });
  }
}

export async function getCategories(req: Request, res: Response) {
  // Put the code in a try-catch
  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    res.status(StatusCodes.NOT_FOUND);
    res.json({message: "There is no categories "})
  }

  return res.json({ categories: categories});
}
