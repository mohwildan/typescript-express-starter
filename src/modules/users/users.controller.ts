import { Response, type NextFunction, type Request } from 'express';
import { type users } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import UserService from './users.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class UserController extends Api {
  private readonly userService = new UserService();

  createUser = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, HttpStatusCode.Created, 'createUser');
    } catch (e) {
      next(e);
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      await this.userService.list(req, res);
    } catch (error) {}
  };
}
