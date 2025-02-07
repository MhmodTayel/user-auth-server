import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const loggerConfig = {
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('user-auth', {
      prettyPrint: true,
      colors: true,
    }),
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: join(__dirname, '../../logs/error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};


export const winstonLoggerInstance = winston.createLogger(loggerConfig);
