import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/singin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.singup(body);
    return user;
  }
  @Post('/login')
  async login(@Body() body: SignInDto) {
    const user = await this.authService.login(body);
    return user;
  }
}
