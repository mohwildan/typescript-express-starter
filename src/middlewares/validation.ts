import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { Service } from './service';
import { ResponseData } from '@/utils/response';

export class Validation {
  services: Service;
  response: ResponseData;
  constructor() {
    this.services = new Service();
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
