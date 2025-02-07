import { Injectable, InternalServerErrorException, ConflictException, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,

  ) { }

  async create(dto: RegisterDto) {
    try {
      dto.email = dto.email.toLowerCase();
      const user = await this.userModel.create(dto);
      const token = await this.getTokenForUser(user)
      this.logger.log('User registration successful', {
        email: dto.email,
        userId: user._id,
      });
      return { user, token };
    } catch (err) {
      this.logger.error('User registration failed', {
        email: dto.email,
        error: err.message,
        stack: err.stack,
      });
      // Handle duplicate email error (MongoDB unique index error)
      if (err.code === 11000) {

        throw new ConflictException('This email is already registered.');
      }
      throw new InternalServerErrorException('An unexpected error occurred. Please try again later.');
    }
  }

  async login(dto: LoginDto) {
    try {
      const email = dto.email.toLowerCase();

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('No account found with this email.');
      }
      const isPasswordValid = await user.validatePassword(dto.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      const token = await this.getTokenForUser(user)
      this.logger.log('Login successful', email);
      return { user, token };
    } catch (error) {
      this.logger.error('Login failed', {
        email: dto.email,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async getTokenForUser(user: UserDocument) {
    return this.jwtService.signAsync({ id: user._id, email: user.email });
  }
}
