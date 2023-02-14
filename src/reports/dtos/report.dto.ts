import { Expose, Transform } from 'class-transformer';
export class ReportDTO {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Expose()
  lat: number;

  @Expose()
  long: number;

  @Expose()
  millage: number;
  @Expose()
  year: number;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;
}
