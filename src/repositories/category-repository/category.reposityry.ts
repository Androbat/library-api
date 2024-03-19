import { prisma } from "../../dbconn";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { isValidEmail } from "../helpers";
import { Request, Response } from "express";



export function createCategory(req: Request, res: Response){
    // 
}