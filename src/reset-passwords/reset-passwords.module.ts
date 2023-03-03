import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SmsModule } from 'src/sms/sms.module';
import { OTPHelperModule } from '../common/helpers/otp/otp-helper.module';
import { UsersModule } from '../users/users.module';
import { ResetPasswordsController } from './reset-passwords.controller';
import { ResetPasswordsService } from './reset-passwords.service';

@Module({
  controllers: [ResetPasswordsController],
  providers: [ResetPasswordsService],
  imports: [UsersModule, OTPHelperModule, JwtModule.register({}), SmsModule],
})
export class ResetPasswordsModule {}
