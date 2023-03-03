import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { RefreshAuthGuard } from 'src/common/guards/refresh-token.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/singin-user.dto';
import { Request } from 'express';
import { Tokens } from './types';
import { Public } from 'src/common/decorators';
import { MobileVerificationService } from './mobile-verification.service';
import { VerifyMobileDTO } from './dtos/verify-mobile.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mobileVerificationService: MobileVerificationService,
  ) {}

  @Post('/signup')
  @Public()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.singup(body);
    return user;
  }

  @Post('/login')
  @Public()
  async login(@Body() body: SignInDto) {
    const user = await this.authService.login(body);
    return user;
  }

  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['id']);
  }

  @Public()
  @Get('refresh-token')
  @UseGuards(RefreshAuthGuard)
  refreshTokens(@Req() req: Request): Promise<Tokens> {
    return this.authService.refresh(req.user['sub'], req.user['refresh_token']);
  }

  @Post('/verify-mobile/send')
  async sendverifyMobileOTP(@Req() req) {
    return await this.mobileVerificationService.sendOTP(req.user);
  }

  @Post('/verify-mobile/verify')
  async verifyMobileOTP(@Req() req: any, @Body() body: VerifyMobileDTO) {
    return await this.mobileVerificationService.verifyOTP(req.user, body);
  }
}
