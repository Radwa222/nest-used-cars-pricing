import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  providers: [SmsService],
  exports: [SmsService],
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
})
export class SmsModule {}
