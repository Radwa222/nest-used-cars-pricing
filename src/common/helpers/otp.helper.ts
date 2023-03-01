import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class OTPHelper {
  protected RESET_PASS_PREFIX = 'reset-password';

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async generateOTP(length: number, mobile_number: string) {
    const otp = Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
    );
    await this.cacheOTP(mobile_number, otp);
    return otp;
  }
  async getOTP(data: string) {
    const key = this.getResetPasswordKey(data);
    return await this.cache.get(key);
  }

  private async cacheOTP(mobile_number: string, otp: number) {
    const key = this.getResetPasswordKey(mobile_number);
    await this.cache.set(key, otp);
  }

  private getResetPasswordKey(data: string) {
    return ` ${this.RESET_PASS_PREFIX}.${data}`;
  }
}
