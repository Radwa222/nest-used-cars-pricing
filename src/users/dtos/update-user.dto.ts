import { IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @Length(3, 20)
  @IsOptional()
  frist_name: string;

  @Length(3, 20)
  @IsOptional()
  last_name: string;
}
