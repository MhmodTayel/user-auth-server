import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  ]
  ,
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
