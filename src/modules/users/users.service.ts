import type { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import Message from '@/utils/message';
import ApiPost from '@/lib/api/service/post';
import ResponseData from '@/utils/response';
import UsersRepository from '@/repository/users.repository';

export default class UserService {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  body: Request['body'];
  params: Request['params'];
  response: ResponseData;
  message: Message;
  servicesPost: ApiPost;
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
    this.servicesPost = this.services.post;
  }

  public create = async () => {
    const { name, email, phone } = this.body;
    const payload: Prisma.usersCreateArgs = {
      data: {
        name,
        email,
        phone,
        deletedAt: null,
      },
    };

    await this.prisma.users.create(payload);
    await this.response.success(null, 'success', this.res);
  };

  public list = async () => {
    const usersRepos = new UsersRepository();
    const { search, sort, sort_field } = this.req.query;
    const filterRepo: Record<string, any> = {};
    const pages: number = Number(this.req.query.page) || 1;
    const limit: number = Number(this.req.query.limit) || 10;
    const skip: number = (pages - 1) * limit;

    if (typeof search !== 'undefined') {
      filterRepo.q = search;
    }

    if (typeof sort !== 'undefined' && typeof sort_field !== 'undefined') {
      filterRepo.sort = sort;
      filterRepo.sortField = sort_field;
    }

    filterRepo.limit = limit;
    filterRepo.skip = skip;
    const { list, total } = await usersRepos.UsersListRepository(filterRepo);
    const result = {
      list,
      total_page: Math.ceil(total / limit),
      total_data: total,
      page: pages,
      limit,
    };
    await this.response.success(result, 'success', this.res);
  };

  public detail = async () => {
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

  public update = async () => {
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
      await this.prisma.users.delete({
        where: { id },
      });
      await this.response.success({}, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };
}
