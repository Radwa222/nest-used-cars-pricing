import { IsNumber, Min, Max, IsLatitude, IsLongitude } from 'class-validator';
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

  @IsNumber()
  modelId: number;

  @IsNumber()
  @Min(0)
  @Max(2000000)
  millage: number;

  @IsNumber()
  @Min(1999)
  @Max(new Date().getFullYear())
  year: number;
}
