import { NextFunction, Request, Response } from 'express';
import { Service } from './service';

export class Validation {
  services: Service;
  constructor() {
    this.services = new Service();
  }

  public saveService = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    req.app.locals.services = {
      post: this.services.service_post.post,
    };
    next();
  };
}
