import { Expose, Transform } from 'class-transformer';
import { CarModel } from 'src/car-model/entities/car-model.entity';
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
  @Transform(({ obj }) => obj.model.id)
  model_id: CarModel;
  @Expose()
  millage: number;
  @Expose()
  year: number;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;
}
