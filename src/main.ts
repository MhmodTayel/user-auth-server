import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/config';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerInstance } from './config/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstonLoggerInstance })
  });

  app.use(helmet());
  app.enableCors(); // for development only

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService<Config, true>);
  const appConfig = configService.get('app', { infer: true });

  await app.listen(appConfig.port);
}
bootstrap();
