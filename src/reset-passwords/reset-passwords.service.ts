import { BadRequestException, Injectable } from '@nestjs/common';
import { OTPHelper } from 'src/common/helpers/otp.helper';
import { UsersService } from '../users/users.service';
import { ResetPasswordRequestDTO } from './dtos/reset-password-request.dto';
import { VerifyOtpDTO } from './dtos/verify-otp.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { JsonWebTokenError } from 'jsonwebtoken';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class ResetPasswordsService {
  constructor(
    private userService: UsersService,
    private otpHelper: OTPHelper,
    private JWT: JwtService,
    private sms: SmsService,
  ) {}

  // send password reset request API
  async sendResetPasswordRequest({ mobile_number }: ResetPasswordRequestDTO) {
    const user = await this.userService.findUserByPhone(mobile_number);
    if (!user) throw new BadRequestException('no such a user found!');
    // Generate OTP
    const otp = await this.otpHelper.generateOTP(6, user.mobile_number);
    await this.sms.sendSMS(
      user.mobile_number,
      `الكود التعريفي الخاص بك هو ${otp}`,
    );
    return 'تم ارسال الكود الخاص بك علي الهاتف';
  }

  // verify reset OTP API
  async verifyOTP(body: VerifyOtpDTO): Promise<object> {
    const stored = await this.otpHelper.getOTP(body.mobile_number);
    if (!stored) throw new BadRequestException('invalid otp');
    if (stored != body.otp) throw new BadRequestException('invalid otp');
    const reset_token = this.JWT.sign(
      { data: body.mobile_number },
      { secret: 'jwt-resert-pass-sec', expiresIn: '120s' },
    );
    return { reset_token };
  }

  // Reset Password API
  async resetPassword({
    mobile_number,
    reset_token,
    new_password,
  }: ResetPasswordDTO) {
    try {
      const user = await this.userService.findUserByPhone(mobile_number);
      if (!user) throw new BadRequestException('no such a user found!');

      await this.JWT.verify(reset_token, {
        secret: 'jwt-resert-pass-sec',
      });
      const update = this.userService.changePassword(user, new_password);

      return update;
    } catch (e) {
      if (e instanceof JsonWebTokenError) throw new BadRequestException(e);
      return e;
    }
  }
}
