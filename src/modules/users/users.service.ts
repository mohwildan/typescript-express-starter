import type { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

export default class UserService {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  body: Request['body'];
  params: Request['params'];
  constructor(req: Request, res: Response) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
    this.body = req.body;
    this.params = req.params;
  }

  create = async () => {
    const { name, email, phone } = this.body;
    const payload: Prisma.usersCreateArgs = {
      data: {
        name,
        email,
        phone,
      },
    };

    await this.prisma.users.create(payload);
    this.res.json({ message: 'success' });
  };

  list = async () => {
    const { search, sort, sort_field } = this.req.query;
    const filterRepo: Prisma.usersFindManyArgs = {};
    const pages: number = Number(this.req.query.page) || 1;
    const limit: number = Number(this.req.query.limit) || 10;
    const take: number = (pages - 1) * limit;

    if (typeof search !== 'undefined') {
      // filter realtime
      filterRepo.where = {
        name: {
          contains: search as string,
        },
      };
    }

    if (typeof sort !== 'undefined' && typeof sort_field !== 'undefined') {
      filterRepo.orderBy = {
        [sort_field as Prisma.UsersScalarFieldEnum]: sort,
      };
    }

    filterRepo.take = limit;
    filterRepo.skip = take;
    const list = await this.prisma.users.findMany(filterRepo);
    const result = {
      list,
      total_page: Math.ceil(list.length / limit),
      total_data: list.length,
      page: pages,
      limit,
    };
    this.res.json(result);
  };
}
