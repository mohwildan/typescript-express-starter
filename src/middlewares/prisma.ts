import { Prisma } from '@prisma/client';
export default class MiddelwarePrisma {
  public softDelete = async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ) => {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deletedAt: new Date() };
    }
    if (params.action === 'findMany' || params.action === 'count') {
      params.args.where = {
        deletedAt: null,
      };
    }
    return await next(params);
  };
}
