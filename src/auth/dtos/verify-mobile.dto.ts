import { IsInt } from 'class-validator';
export class VerifyMobileDTO {
  @IsInt()
  otp: number;
}
