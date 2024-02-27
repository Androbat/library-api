import { PrismaClient } from "@prisma/client";

// Validate the connection to catch any error that may occur
export const prisma = new PrismaClient();