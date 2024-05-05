import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prisma } from "../../dbconn";

export async function createProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, description, price, categoryId } = req.body;

    if (!name || !description || !price || !categoryId) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid Request" });
      return;
    }

    // Change validation here
    const categoryExist = await prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!categoryExist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You don't have a category. Please created one." });
      return;
    } else {
      const repeatedProduct = await prisma.product.findFirst({
        where: { name: name },
      });
      if (repeatedProduct) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "This product already exist!" });
          return;
      }
      await prisma.product.create({
        data: {
          name: name,
          description: description,
          price: price,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
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

    res
      .status(StatusCodes.OK)
      .json({ message: "Product successfully created" });
    // console.log(productCreated);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
}

export async function getProductsById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid request" });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    res.json({ user: product });
  } catch (error) {
    res.json({ error: error });
  }
}

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const name = req.query.name;
    const startPrice = req.query.startPrice;
    const endPrice = req.query.endPrice;
    const rawQuery = req.query;

    const products = await prisma.product.findMany();
    if (!products.length) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "You have no products, please create at least one" });
      return;
    }

    if (rawQuery) {
      if (name) {
        const filterByName = await prisma.product.findMany({
          where: {
            name: { contains: name.toString() },
          },
        });

        res.status(StatusCodes.OK).json({ products: filterByName });
        return;
      } else if (startPrice && endPrice) {
        console.log(startPrice);
        const filterByPrice = await prisma.product.findMany({
          where: {
            price: {
              gte: +startPrice,
              lte: +endPrice,
            },
          },
        });

        // console.log(filterByPrice);

        res.status(StatusCodes.OK).json({ Products: filterByPrice });
        return;
      }
    }

    res.json({ products: products });
    return;
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
}
