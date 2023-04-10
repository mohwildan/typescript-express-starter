import { Response, type Request } from 'express';
import MaknaService from './makna.service';
import ResponseData from '@/utils/response';

class MaknaController {
  response: ResponseData;
  constructor() {
    this.response = new ResponseData();
  }

  public create = async (req: Request, res: Response) => {
    const service: MaknaService = new MaknaService(req, res);
    try {
      await service.create();
    } catch (e) {
      console.log(e);
    }
  };

  public list = async (req: Request, res: Response) => {
    const service: MaknaService = new MaknaService(req, res);
    try {
      await service.list();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public detail = async (req: Request, res: Response) => {
    const service: MaknaService = new MaknaService(req, res);
    try {
      await service.detail();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public update = async (req: Request, res: Response) => {
    const service: MaknaService = new MaknaService(req, res);
    try {
      await service.update();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const service: MaknaService = new MaknaService(req, res);
    try {
      await service.delete();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };
}
export default MaknaController;
