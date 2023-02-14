import {
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(5000000)
  price: number;

  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsLongitude()
  long: number;

  @IsNotEmpty()
  modelId: Types.ObjectId;

  @IsNumber()
  @Min(0)
  @Max(2000000)
  millage: number;

  @IsNumber()
  @Min(1999)
  @Max(new Date().getFullYear())
  year: number;
}
