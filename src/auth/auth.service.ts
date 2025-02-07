import { Injectable, InternalServerErrorException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private readonly jwtService: JwtService) { }

  async create(dto: RegisterDto) {
    try {
      dto.email = dto.email.toLowerCase();
      const user = await this.userModel.create(dto);
      const token = await this.getTokenForUser(user)
      return { user, token };
    } catch (err) {
      // Handle duplicate email error (MongoDB unique index error)
      if (err.code === 11000) {
        throw new ConflictException('This email is already registered.');
      }
      throw new InternalServerErrorException('An unexpected error occurred. Please try again later.');
    }
  }

  async login(dto: LoginDto) {
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
    return { user, token };
  }

  async getTokenForUser(user: UserDocument) {
    return this.jwtService.signAsync({ id: user._id, email: user.email });
  }
}
