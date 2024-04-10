import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prisma } from "../../dbconn";

export async function createProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    
    const { name, description, price, categoryId } = req.body;

    if (!name || !description || !price) {
      res.status(StatusCodes.BAD_REQUEST)
      res.json({ error: "Invalid Request" });
      return;
    }

    // Using a type I can avoid this validation
    // if (
    //   typeof name !== "string" ||
    //   typeof description !== "string" ||
    //   typeof price !== "number" ||
    //   typeof categoryId !== "string"
    // ) {
    //   res.status(StatusCodes.BAD_REQUEST);
    //   res.json({ error: "Invalid type of data" });
    // }

    if (!categoryId) {
      res.status(StatusCodes.BAD_REQUEST)
      res.json({ message: "You don't have a category. Please created one." });
      return;
    } else {

      await prisma.product.create({
        data: {
          name: name,
          description: description,
          price: price,
          category: {
            connect: {
              id: categoryId
            }
          }
        },
      });
    }


    res.status(StatusCodes.OK).json({ message: "Product successfully created" });
    // console.log(productCreated);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
}


export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();
    if (!products.length) {
      res.status(StatusCodes.NOT_FOUND);
      res.json({ message: "You have no products, please create at least one" });
    }

    res.json({ products: products });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error: error });
  }
}
