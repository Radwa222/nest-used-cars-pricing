import { IsPhoneNumber } from 'class-validator';
export class ResetPasswordRequestDTO {
  @IsPhoneNumber()
  mobile_number: string;
}
