import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.login(loginDto);
  }
}
