import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Report } from '../reports/report.schema';
import { Role } from '../enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  frist_name: string;

  @Prop()
  last_name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Report' }] })
  reports: Report[];

  @Prop({
    type: String,
    required: true,
    default: Role.User,
    enum: [Role.Admin, Role.User],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
