import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import Services from './service';
import ResponseData from '@/utils/response';

class Validation {
  services: Services;
  response: ResponseData;
  constructor() {
    this.services = new Services();
    this.response = new ResponseData();
  }

  public validation =
    (schema: AnyZodObject | null) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schema !== null) {
          await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
          });
        }
        await this.services.saveService(req);
        next();
      } catch (e) {
        await this.response.failed(e, 'failed', res);
      }
    };
}
export default Validation;
