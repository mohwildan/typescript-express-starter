#!/bin/bash

# Prints text in bolg green color
green_bold() {
  echo -e "$(tput bold)$(tput setaf 2)$(echo "$1")$(tput sgr0)"
}

# Reading module name
echo "Module name:"
read -r module_name

# Creating folder
mkdir -p src/modules/"$module_name"
echo "Created folder:
   $(green_bold "src/modules/"$module_name"")
"
name=${module_name}
name=`echo ${name:0:1} | tr  '[a-z]' '[A-Z]'`${name:1}
# Creating files
cd src/modules/"$module_name" || exit
touch "$module_name".controller.ts "$module_name".service.ts "$module_name".route.ts
echo "import type { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import Message from '@/utils/message';
import ResponseData from '@/utils/response';

export default class ${name}Service {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  body: Request['body'];
  params: Request['params'];
  response: ResponseData;
  message: Message;
  services: any;
  constructor(req: Request, res: Response) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
    this.body = req.body;
    this.params = req.params;
    this.response = new ResponseData();
    this.message = new Message();
    this.services = req.app.locals.services;
  }

  public create = async () => {
    try {
      await this.response.success(null, 'success', this.res);
    } catch (e) {
      await this.response.failed({}, e.message, this.res);
    }
  };

  public list = async () => {
    const { search, sort, sort_field } = this.req.query;
    const filterRepo: Prisma.usersFindManyArgs = {};
    const pages: number = Number(this.req.query.page) || 1;
    const limit: number = Number(this.req.query.limit) || 10;
    const skip: number = (pages - 1) * limit;

    if (typeof search !== 'undefined') {
      filterRepo.where = {
        name: {
          contains: search as string,
        },
      };
    }

    if (typeof sort !== 'undefined' && typeof sort_field !== 'undefined') {
      filterRepo.orderBy = {
        [sort_field as Prisma.UsersScalarFieldEnum]: sort,
      };
    }

    filterRepo.take = limit;
    filterRepo.skip = skip;
    const list = await this.prisma.users.findMany(filterRepo);
    const result = {
      list,
      total_page: Math.ceil(list.length / limit),
      total_data: list.length,
      page: pages,
      limit,
    };
    await this.response.success(result, 'success', this.res);
  };

  public detail = async () => {
    const { id } = this.params;
    try {
      await this.response.success(id, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };

  public delete = async () => {
    const { id } = this.params;
    try {
      await this.response.success(id, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };

  public update = async () => {
    const { id } = this.params;
    try {
      await this.response.success(id, 'success', this.res);
    } catch (e) {
      console.log(e);
      await this.response.failed({}, e.message, this.res);
    }
  };
}" >> "$module_name.service.ts"
echo "import { Response, type Request } from 'express';
import ${name}Service from './$module_name.service';
import ResponseData from '@/utils/response';

class ${name}Controller {
  response: ResponseData;
  constructor() {
    this.response = new ResponseData();
  }

  public create = async (req: Request, res: Response) => {
    const service: ${name}Service = new ${name}Service(req, res);
    try {
      await service.create();
    } catch (e) {
      console.log(e);
    }
  };

  public list = async (req: Request, res: Response) => {
    const service: ${name}Service = new ${name}Service(req, res);
    try {
      await service.list();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public detail = async (req: Request, res: Response) => {
    const service: ${name}Service = new ${name}Service(req, res);
    try {
      await service.detail();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public update = async (req: Request, res: Response) => {
    const service: ${name}Service = new ${name}Service(req, res);
    try {
      await service.update();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const service: ${name}Service = new ${name}Service(req, res);
    try {
      await service.delete();
    } catch (e) {
      await this.response.failed('', 'failed', res);
    }
  };
}
export default ${name}Controller;" >> "$module_name.controller.ts"
echo "import { Router } from 'express';
import ${name}Controller from './${module_name}.controller';
import ${name}Schema from '@/schema/user.schema';
import Validation from '@/middlewares/validation';

const users: Router = Router();
const controller = new ${name}Controller();
const { validation } = new Validation();
const schema = new ${name}Schema();

users.post('/create', validation(schema.post), controller.create);
users.get('/list', validation(null), controller.list);
users.get('/detail/:id', validation(null), controller.detail);
users.put('/update/:id', validation(null), controller.update);
users.delete('/delete/:id', validation(null), controller.delete);

export default users;" >> "$module_name.route.ts"

cd ../../repository || exit

echo "import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

export default class ${name}Repository {
  private readonly prisma: PrismaClient = prisma;

  private generateSlug(options: Record<string, any>) {
    const args: Prisma.${module_name}FindManyArgs = {};
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
        [options.sortField as Prisma.${module_name}ScalarFieldEnum]: options.sort,
      };
    }

    // pagination
    if (
      Object.prototype.hasOwnProperty.call(options, 'limit') &&
      Object.prototype.hasOwnProperty.call(options, 'skip')
    ) {
      if (options.limit !== -1) {
        args.take = options.limit;
        args.skip = options.skip;
      }
    }
    return args;
  }

  public ${name}ListRepository = async (
    options: Record<string, any>
  ): Promise<any> => {
    try {
      const findOptions: Prisma.usersFindManyArgs = this.generateSlug(options);
      const list = await this.prisma.${module_name}.findMany(findOptions);
      const count = await this.prisma.${module_name}.count(findOptions as any);
      return { list, total: count };
    } catch (e) {
      throw new Error(e.message);
    }
  };
}" >> "$module_name.repository.ts"
echo -e "Created:
  $(green_bold ""$module_name".controller.ts")
  $(green_bold ""$module_name".service.ts")
  $(green_bold ""$module_name".route.ts")
  $(green_bold ""$module_name".repository.ts")
"
