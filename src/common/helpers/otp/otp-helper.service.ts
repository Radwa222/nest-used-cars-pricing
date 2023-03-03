import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class OtpService {
  protected RESET_PASS_PREFIX = 'reset-password';
  protected VERIFY_NUMBER_PREFIX = 'verify-mobile-number';

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  private generateOTP(length: number) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
    );
  }

  async resetPasswordOTP(
    length: number,
    mobile_number: string,
  ): Promise<number> {
    const otp = this.generateOTP(length);
    const key = `${this.RESET_PASS_PREFIX}.${mobile_number}`;
    await this.cache.set(key, otp);
    return await this.cache.get(key);
  }
  async getResetPasswordOTP(data: string) {
    const key = `${this.RESET_PASS_PREFIX}.${data}`;
    return await this.cache.get(key);
  }

  async sendVerifyNumberOTP(length: number, mobile_number: string) {
    const otp = this.generateOTP(length);
    const key = `${this.VERIFY_NUMBER_PREFIX}.${mobile_number}`;
    await this.cache.set(key, otp);
    return await this.cache.get(key);
  }

  async getMobileVerificationOTP(
    mobile_number: string,
  ): Promise<number | null> {
    const key = `${this.VERIFY_NUMBER_PREFIX}.${mobile_number}`;
    return await this.cache.get(key);
  }
}
