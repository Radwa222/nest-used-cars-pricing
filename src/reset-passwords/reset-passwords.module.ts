import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SmsModule } from 'src/sms/sms.module';
import { OTPHelper } from '../common/helpers/otp.helper';
import { UsersModule } from '../users/users.module';
import { ResetPasswordsController } from './reset-passwords.controller';
import { ResetPasswordsService } from './reset-passwords.service';

@Module({
  controllers: [ResetPasswordsController],
  providers: [ResetPasswordsService, OTPHelper],
  imports: [
    UsersModule,
    CacheModule.register({
      ttl: 60000, // millisecond
      max: 10, // maximum number of items in cache
    }),
    JwtModule.register({}),
    SmsModule,
  ],
})
export class ResetPasswordsModule {}
