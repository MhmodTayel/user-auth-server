// auth.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { JwtPayload } from './jwt-payload.interface';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc, UserModel } from './user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async register(
    userDto: RegisterDto,
  ): Promise<{ accessToken: string; user: User }> {
    try {
      const user = await this.userModel.create({
        email: userDto.email.toLowerCase(),
        name: userDto.name,
        password: userDto.password,
      });

      const token = await this.getToken(user);
      return { accessToken: token, user };
    } catch (err) {
      if (err.code === 11000)
        throw new BadRequestException('Email is already exists.');
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({
      email: email.toLowerCase(),
    });
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const token = await this.getToken(user);
    return { accessToken: token, user };
  }

  async getToken(user: UserDoc) {
    const id = user._id;
    return this.jwtService.signAsync({ id });
  }
}
