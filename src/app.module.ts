import { Module, Logger } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { Config } from './config/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRootAsync(
      {
        useFactory: (configService: ConfigService<Config>) => {
          const securityConfig = configService.get('security', { infer: true })
          return {
            throttlers: [{ ttl: securityConfig.throttler.ttl, limit: securityConfig.throttler.limit }]
          }
        },
        inject: [ConfigService],

      }

    ),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => {
        const dbConfig = configService.get('database', { infer: true });
        return {
          uri: dbConfig.url,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }, Logger],
})
export class AppModule { }
