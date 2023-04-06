import chalk from 'chalk';
import { HR } from './helper';
import environment from '@/lib/environment';
import { logWithoutConsole } from '@/lib/logger';

const primaryChalk = chalk.green;

const label = (text: string): string => {
  const labelChalk = chalk.white.bold;
  const icon = primaryChalk('✔');
  return `${icon} ${labelChalk(text)}`;
};

export const printAppInfo = (port: number, env: string, appUrl: string) => {
  const divider = HR('blue', '~', 55);
  const urlChalk = chalk.underline.blue;
  const serverSuccessMessage = primaryChalk.bold(
    '🚀 Server successfully started'
  );
  console.log(`
    \r${divider}\n
    \r${serverSuccessMessage}\n
    \r${divider}\n
    \r${label('Port')}: ${primaryChalk(port)}\n
    \r${label('ENV')}: ${primaryChalk(env)}\n
    \r${label('App URL')}: ${urlChalk(appUrl)}\n
    \r${divider}
  `);
  if (!environment.isDev()) {
    logWithoutConsole({
      level: 'info',
      message: `Server started at ${appUrl}`,
    });
  }
};
