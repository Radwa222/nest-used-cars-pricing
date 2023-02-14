import { IsString, IsEmail, Length } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @Length(3, 20)
  frist_name: string;
  @Length(3, 20)
  last_name: string;
}
