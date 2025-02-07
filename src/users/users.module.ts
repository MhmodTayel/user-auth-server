import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        const securityConfig = configService.get('security', { infer: true })
        return {
          secret: securityConfig.secret,
          signOptions: {
            expiresIn: securityConfig.expiresIn
          }
        }
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService]
})
export class UsersModule { }
