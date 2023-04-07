import type { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ResponseData } from '@/utils/response';
import Message from '@/utils/message';
import ApiPost from '@/lib/api/service/post';

export default class UserService {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  body: Request['body'];
  params: Request['params'];
  response: ResponseData;
  message: Message;
  servicesPost: ApiPost;
  constructor(req: Request, res: Response) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
    this.body = req.body;
    this.params = req.params;
    this.response = new ResponseData();
    this.message = new Message();
    this.servicesPost = req.app.locals.services.post;
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
    await this.response.success(null, 'success', this.res);
  };

  list = async () => {
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

  detail = async () => {
    const { id } = this.params;
    try {
      const user = await this.prisma.users.findUnique({ where: { id } });
      if (!user) {
        return await this.response.failed(
          null,
          this.message.notFound('user'),
          this.res
        );
      }

      await this.response.success(user, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };
}
