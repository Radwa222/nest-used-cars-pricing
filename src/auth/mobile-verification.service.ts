import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { OtpService } from '../common/helpers/otp/otp-helper.service';
import { SmsService } from '../sms/sms.service';
import { VerifyMobileDTO } from './dtos/verify-mobile.dto';

@Injectable()
export class MobileVerificationService {
  constructor(
    private readonly sms: SmsService,
    private readonly otp: OtpService,
    private readonly userService: UsersService,
  ) {}

  async sendOTP(user: UserDocument) {
    console.log(user);
    if (user.is_mobile_verified) throw HttpStatus.NO_CONTENT;
    const otp = await this.otp.sendVerifyNumberOTP(4, user.mobile_number);
    // await this.sms.sendSMS(
    //   user.mobile_number,
    //   `الكود التعريفي الخاص بك هو ${otp}`,
    // );

    return {
      message: 'تم ارسال الكود التعريفي الخاص بك علي رقم الهاتف ',
      otp,
    };
  }

  async verifyOTP(user: UserDocument, { otp }: VerifyMobileDTO) {
    if (user.is_mobile_verified) throw HttpStatus.FOUND;
    const storedOtp = await this.otp.getMobileVerificationOTP(
      user.mobile_number,
    );
    if (!storedOtp) throw new BadRequestException('invalid otp');
    if (storedOtp != otp) throw new BadRequestException('invalid otp');
    await this.userService.verifyMobileNumber(user);

    return {
      message: 'تم التحقق من رقم الهاتف الخاص بك',
      user,
    };
  }
}
