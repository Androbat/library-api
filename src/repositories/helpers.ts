import validator from "validator";
import { Response } from "express";

export function isValidEmail(email: string): boolean {
    return validator.isEmail(email);
}

export function error(error: Error, res: Response){
    return res.json({ error: error });
}