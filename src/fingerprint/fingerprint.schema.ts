import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type FingerprintDocument = Fingerprint & Document;

@Schema({
  timestamps: true,
})
export class Fingerprint {
  @Prop({ required: true })
  createdBy : string;
  @Prop({ required: true })
  startDate : Number;
  @Prop({ required: true })
  endDate : Number;
  @Prop({ required : true})
  lockId: string;
  @Prop({required: true })
  fingerprintNumber: Number;
  @Prop({ required: true })
  fingerprintName: string;
  @Prop({ required: true })
  fingerprintType: Number;
  @Prop({ required: true })
  fingerprintId: Number;
  @Prop({ required: true, default: false })
  delete: Boolean;
  @Prop({required : true})
  created : Number;
  @Prop({required : true})
  updated : Number;
}

export const BookingSchema = SchemaFactory.createForClass(Fingerprint);
