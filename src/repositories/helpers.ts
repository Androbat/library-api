import validator from "validator";
import { Response } from "express";
import bcrypt from "bcrypt";

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function error(error: Error, res: Response) {
  return res.json({ error: error });
}

export async function hashPassword(password: string, salt: number) {
  return await bcrypt.hash(password, salt);
}
