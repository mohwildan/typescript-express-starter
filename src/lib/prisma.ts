import { PrismaClient } from '@prisma/client';
import MiddelwarePrisma from '@/middlewares/prisma';
const prisma = new PrismaClient();

const middlewares = new MiddelwarePrisma();
prisma.$use(middlewares.softDelete);
export default prisma;
