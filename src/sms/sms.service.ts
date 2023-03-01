import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class SmsService {
  public constructor(
    private readonly twilioService: TwilioService,
    private readonly config: ConfigService,
  ) {}

  async sendSMS(to: string, body: string) {
    return this.twilioService.client.messages.create({
      body,
      from: this.config.get('TWILIO_PHONE_NUMBER_TO'),
      to,
    });
  }
}
