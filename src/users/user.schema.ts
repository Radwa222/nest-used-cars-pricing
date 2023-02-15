import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Report } from '../reports/report.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  frist_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Report' }] })
  reports: Report[];

  @Prop({ default: null })
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
