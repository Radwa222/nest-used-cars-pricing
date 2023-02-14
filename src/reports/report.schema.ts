import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CarModel } from 'src/car-model/car-model.schema';

export type ReporttDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop()
  price: number;

  @Prop()
  lat: number;

  @Prop()
  long: number;

  @Prop()
  millage: number;

  @Prop()
  year: number;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'CarModel' })
  model: CarModel;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
