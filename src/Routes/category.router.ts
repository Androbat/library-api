import { createCategory, getCategories } from "../repositories/category-repository/category.reposityry";
import { Router } from "express";

const router = Router();

router.get('/', getCategories);
router.post('/', createCategory);


export default router;