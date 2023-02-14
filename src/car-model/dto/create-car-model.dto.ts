import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCarModelDto {
  @IsString()
  model: string;

  @IsNotEmpty()
  brandId: Types.ObjectId;
}
