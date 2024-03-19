import { Router } from "express";
import { getUser, getUsers, deleteUser, updateUser } from "../repositories/user-repository/user.repository";

const router = Router();

router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;