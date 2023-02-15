import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Report } from '../reports/report.schema';
import { Role } from '../enums/roles.enum';

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

  @Prop({
    type: String,
    required: true,
    default: Role.User,
    enum: [Role.Admin, Role.User],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
