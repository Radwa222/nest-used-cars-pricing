import { IsString } from 'class-validator';

export class UpdateCarBrandDto {
  @IsString()
  name: string;
}
