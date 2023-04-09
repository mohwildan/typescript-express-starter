import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

export default class UsersRepository {
  private readonly prisma: PrismaClient = prisma;

  private generateSlug(options: Record<string, any>) {
    const args: Prisma.usersFindManyArgs = {};
    if (Object.prototype.hasOwnProperty.call(options, 'q') && options.q) {
      args.where = {
        name: {
          contains: options.q,
        },
      };
    }

    // sort
    if (
      Object.prototype.hasOwnProperty.call(options, 'sort') &&
      Object.prototype.hasOwnProperty.call(options, 'sortField')
    ) {
      args.orderBy = {
        [options.sortField as Prisma.UsersScalarFieldEnum]: options.sort,
      };
    }

    // pagination
    if (
      Object.prototype.hasOwnProperty.call(options, 'take') &&
      Object.prototype.hasOwnProperty.call(options, 'skip')
    ) {
      if (options.take !== -1) {
        args.take = options.take;
        args.skip = options.skip;
      }
    }
    return args;
  }

  public UsersListRepository = async (
    options: Record<string, any>
  ): Promise<any> => {
    try {
      const findOptions: Prisma.usersFindManyArgs = this.generateSlug(options);
      const list = await this.prisma.users.findMany(findOptions);

      return { list, total: list.length };
    } catch (e) {
      throw new Error(e.message);
    }
  };
}
