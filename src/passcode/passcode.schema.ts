import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type PasscodeDocument = Passcode & Document;

@Schema({
  timestamps: true,
})
export class Passcode {
  @Prop({ required: true })
  createdBy : string;
  @Prop({ required: true })
  startDate : Number;
  @Prop({ required: true })
  endDate : Number;
  @Prop({ required: true})
  lockId: string;
  @Prop({ })
  keyboardPwdType: Number;
  @Prop({ required: true })
  keyboardPwdName: string;
  @Prop({ required: true })
  keyboardPwd: string;
  @Prop({ required: true })
  keyboardPwdId: Number;
  @Prop({ required: true, default: false })
  delete: Boolean;
  @Prop({required : true})
  created : Number;
  @Prop({required : true})
  updated : Number;
} 

export const BookingSchema = SchemaFactory.createForClass(Passcode);
