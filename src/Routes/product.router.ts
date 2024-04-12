import { createProduct, getProducts, getProductsById } from "../repositories/product-repository/product.repository";
import { Router } from "express";

const router = Router();

router.get('/:id', getProductsById);
router.get('/', getProducts);
router.post('/', createProduct);


export default router;