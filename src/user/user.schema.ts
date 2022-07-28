import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { ProfileTypeEnum } from 'src/enums/profileEnum';
import { UserTypeEnum } from 'src/enums/userType';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  usernameHash : string;
  @Prop({ required: true, unique: true })
  ttLockHash : string;
  @Prop({ required: true, unique: true })
  username : string;
  @Prop({ required: true, unique: true })
  fullName : string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  date: string;
  @Prop({})
  uid: number;
  @Prop({})
  locationName: string;
  @Prop({})
  longitude: number;
  @Prop({})
  latitude: number;
  @Prop({})
  oneSignalId: string;
  @Prop({})
  phoneNumber: string;
  @Prop({})
  dialingCode: string;
  @Prop({})
  openid: number;
  @Prop({})
  scope: string;
  @Prop({})
  access_token : string;
  @Prop({})
  refresh_token: string;
  @Prop({ required: true, default: false })
  delete : Boolean;
  @Prop({type: [Number], default : [0], enum: ProfileTypeEnum})
  userType: Array<number>;
  @Prop({type: [Number], enum: UserTypeEnum})
  profileType: Array<number>;
  @Prop({required : true})
  created : Number;
  @Prop({required : true})
  updated : Number;
}

export const UserSchema = SchemaFactory.createForClass(User);
