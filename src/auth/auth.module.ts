import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { RefreshTokenStrategy } from './strategies';
import { MobileVerificationService } from './mobile-verification.service';
import { SmsModule } from 'src/sms/sms.module';
import { OTPHelperModule } from 'src/common/helpers/otp/otp-helper.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    SmsModule,
    OTPHelperModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    MobileVerificationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
