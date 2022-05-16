import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username : string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  date: number;
  @Prop({})
  uid: number;
  @Prop({})
  openid: number;
  @Prop({})
  scope: string;
  @Prop({})
  access_token : string;
  @Prop({})
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
