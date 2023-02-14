import { IsString } from 'class-validator';
export class CreateCarBrandDto {
  @IsString()
  name: string;
}
