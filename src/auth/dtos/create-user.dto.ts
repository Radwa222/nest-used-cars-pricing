import { IsString, IsEmail, Length, IsPhoneNumber } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  mobile_number: string;

  @IsString()
  password: string;

  @Length(3, 20)
  frist_name: string;

  @Length(3, 20)
  last_name: string;
}
