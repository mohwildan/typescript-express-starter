import { Response, type NextFunction, type Request } from 'express';
import { type users } from '@prisma/client';
import UserService from './users.service';
import { type CustomResponse } from '@/types/common.type';

class UserController {
  static create = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    const service = new UserService(req, res);
    try {
      await service.create();
    } catch (e) {
      next(e);
    }
  };

  static list = async (req: Request, res: Response) => {
    const service = new UserService(req, res);
    try {
      await service.list();
    } catch (error) {}
  };
}
export default UserController;
