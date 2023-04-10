import type { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import Message from '@/utils/message';
import ResponseData from '@/utils/response';

export default class MaknaService {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  body: Request['body'];
  params: Request['params'];
  response: ResponseData;
  message: Message;
  services: any;
  constructor(req: Request, res: Response) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
    this.body = req.body;
    this.params = req.params;
    this.response = new ResponseData();
    this.message = new Message();
    this.services = req.app.locals.services;
  }

  public create = async () => {
    try {
      await this.response.success(null, 'success', this.res);
    } catch (e) {
      await this.response.failed({}, e.message, this.res);
    }
  };

  public list = async () => {
    const { search, sort, sort_field } = this.req.query;
    const filterRepo: Prisma.usersFindManyArgs = {};
    const pages: number = Number(this.req.query.page) || 1;
    const limit: number = Number(this.req.query.limit) || 10;
    const skip: number = (pages - 1) * limit;

    if (typeof search !== 'undefined') {
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
    filterRepo.skip = skip;
    const list = await this.prisma.users.findMany(filterRepo);
    const result = {
      list,
      total_page: Math.ceil(list.length / limit),
      total_data: list.length,
      page: pages,
      limit,
    };
    await this.response.success(result, 'success', this.res);
  };

  public detail = async () => {
    const { id } = this.params;
    try {
      await this.response.success(id, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };

  public delete = async () => {
    const { id } = this.params;
    try {
      await this.response.success(id, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };

  public update = async () => {
    const { id } = this.params;
    try {
      await this.response.success(id, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };
}
