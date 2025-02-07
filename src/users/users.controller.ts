import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @UseGuards(JwtGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findOneById(req.user.id);
  }
}