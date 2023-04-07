import { config as configDotenv } from 'dotenv';
import server from './app';
import { printAppInfo } from './utils/print-app-info';
import prismaClient from '@/lib/prisma';
import environment from '@/lib/environment';

configDotenv();

server.listen(process.env.PORT, () => {
  const { port, env, appUrl: _appUrl } = environment;
  const appUrl = `${_appUrl}:${port}`;
  printAppInfo(port, env, appUrl);
});

process.on('SIGINT', () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  prismaClient.$disconnect();
  console.log('Prisma Disconnected.');
  process.exit(0);
});
