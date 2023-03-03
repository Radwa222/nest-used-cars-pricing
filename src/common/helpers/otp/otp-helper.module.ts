import { CacheModule, Module } from '@nestjs/common';
import { OtpService } from './otp-helper.service';

@Module({
  providers: [OtpService],
  exports: [OtpService],
  imports: [
    CacheModule.register({
      ttl: 60000, // millisecond
      max: 10, // maximum number of items in cache
    }),
  ],
})
export class OTPHelperModule {}
