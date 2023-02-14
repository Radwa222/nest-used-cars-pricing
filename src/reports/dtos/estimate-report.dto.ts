import { IsNumber, Min, Max, IsLatitude, IsLongitude } from 'class-validator';
import { Transform } from 'class-transformer';
export class EstimateReportDTO {
  @IsNumber()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsNumber()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  long: number;

  @IsNumber()
  modelId: number;

  @IsNumber()
  @Min(0)
  @Max(2000000)
  @Transform(({ value }) => +value)
  millage: number;

  @IsNumber()
  @Min(1999)
  @Max(new Date().getFullYear())
  @Transform(({ value }) => +value)
  year: number;
}
