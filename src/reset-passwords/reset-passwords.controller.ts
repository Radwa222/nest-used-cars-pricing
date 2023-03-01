import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ResetPasswordRequestDTO } from './dtos/reset-password-request.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { VerifyOtpDTO } from './dtos/verify-otp.dto';
import { ResetPasswordsService } from './reset-passwords.service';

@Controller('reset-passwords')
export class ResetPasswordsController {
  constructor(private resetService: ResetPasswordsService) {}
  @Public()
  @Post('/request')
  resetPasswordRequest(@Body() body: ResetPasswordRequestDTO) {
    return this.resetService.sendResetPasswordRequest(body);
  }

  @Public()
  @Post('/verify')
  verifyOTP(@Body() body: VerifyOtpDTO) {
    return this.resetService.verifyOTP(body);
  }

  @Public()
  @Post('')
  resetPassword(@Body() body: ResetPasswordDTO) {
    return this.resetService.resetPassword(body);
  }
}
