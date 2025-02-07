import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { Config } from './config/config';

@Module({
  imports: [
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
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
