import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CarBrand } from 'src/car-brand/car-brand.schema';
import { Report } from 'src/reports/report.schema';

export type CarModelDocument = HydratedDocument<CarModel>;

@Schema()
export class CarModel {
  @Prop()
  model: string;

  @Prop({ type: Types.ObjectId, ref: 'CarBrand' })
  brand: CarBrand;

  @Prop({ type: [{ type: Types.ObjectId, ref: Report.name }] })
  reports: Report[];
}

export const CarModelSchema = SchemaFactory.createForClass(CarModel);
