import { Prisma } from '@prisma/client';
export default class MiddelwarePrisma {
  public softDelete = async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ) => {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deletedAt: new Date(), deleted: true };
    }
    if (params.action === 'findMany') {
      params.args.where = {
        deleted: false,
      };
    }
    if (params.action === 'count') {
      params.args.where = {
        deleted: false,
      };
    }
    return await next(params);
  };
}
