import { IsString, IsNumber } from 'class-validator';
export class CreateCarModelDto {
  @IsString()
  model: string;
  @IsNumber()
  brandId: number;
}
