import { IsString } from 'class-validator';

export class UpdateCarModelDto {
  @IsString()
  model: string;
}
