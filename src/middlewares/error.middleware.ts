import { StatusCodes } from "http-status-codes";
import express, { Express, Request, Response } from "express";

export function errorMiddleware(res: Response): void {
  res
    .status(StatusCodes.BAD_REQUEST)
    .send(JSON.stringify({ error: "Bad request" }));
}
