import { type users } from '@prisma/client';
import prisma from '@/lib/prisma';
import { Request, Response } from 'express';

export default class UserService {
  async createUser(data: users) {
    const user = await prisma.users.create({ data });
    return user;
  }

  async list(req: Request, res: Response) {
    const { search, sort, sort_field } = req.query;
    const filterRepo: any = {};
    const pages: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const take: number = (pages - 1) * limit;

    if (typeof search !== 'undefined') {
      filterRepo.where = {
        name: search,
      };
    }
    if (typeof sort !== 'undefined' && typeof sort_field !== 'undefined') {
      filterRepo.orderBy = {
        [sort_field as string]: sort,
      };
    }

    filterRepo.take = limit;
    filterRepo.skip = take;
    const list = await prisma.users.findMany(filterRepo);
    const result = {
      list,
      total_page: Math.ceil(list.length / limit),
      total_data: list.length,
      page: pages,
      limit,
    };
    res.json(result);
  }
}
