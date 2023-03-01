import { IsInt, IsPhoneNumber, IsPositive } from 'class-validator';
export class VerifyOtpDTO {
  @IsPhoneNumber()
  mobile_number: string;

  @IsInt()
  @IsPositive()
  otp: number;
}
