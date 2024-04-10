import { createProduct, getProducts } from "../repositories/product-repository/product.repository";
import { Router } from "express";

const router = Router();

router.get('/', getProducts)
router.post('/', createProduct);


export default router;