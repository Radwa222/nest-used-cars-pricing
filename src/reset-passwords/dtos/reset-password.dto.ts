import { IsPhoneNumber, IsJWT, IsStrongPassword } from 'class-validator';
export class ResetPasswordDTO {
  @IsPhoneNumber()
  mobile_number: string;

  @IsJWT()
  reset_token: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  new_password: string;
}
