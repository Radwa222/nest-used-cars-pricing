import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CarModel } from 'src/car-model/car-model.schema';

export type CarBrandDocument = HydratedDocument<CarBrand>;

@Schema()
export class CarBrand {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CarModel' }] })
  models: CarModel[];
}

export const CarBrandSchema = SchemaFactory.createForClass(CarBrand);
