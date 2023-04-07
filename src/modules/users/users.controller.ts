import { Response, type Request } from 'express';
import { type users } from '@prisma/client';
import UserService from './users.service';
import { type CustomResponse } from '@/types/common.type';
import { ResponseData } from '@/utils/response';

class UserController {
  response: ResponseData;
  constructor() {
    this.response = new ResponseData();
  }

  public create = async (req: Request, res: CustomResponse<users>) => {
    const service: UserService = new UserService(req, res);
    try {
      await service.create();
    } catch (e) {
      console.log(e);
    }
  };

  public list = async (req: Request, res: Response) => {
    const service: UserService = new UserService(req, res);
    try {
      await service.list();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public detail = async (req: Request, res: Response) => {
    const service: UserService = new UserService(req, res);
    try {
      await service.detail();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };
}
export default UserController;
