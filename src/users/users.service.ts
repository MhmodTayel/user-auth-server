import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly logger: Logger,

  ) { }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      this.logger.error('Error finding user by email', {
        email,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;

    } catch (error) {
      this.logger.error('Error finding user by email', {
        id,
        error: error.message,
        stack: error.stack,

      });
      throw new NotFoundException('User not found')
    }

  }
}
