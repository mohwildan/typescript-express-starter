import { PrismaClient } from '@prisma/client';
import MiddelwarePrisma from '@/middlewares/prisma';
const prisma = new PrismaClient();

prisma.$use(MiddelwarePrisma.softDelete);
export default prisma;
