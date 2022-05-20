import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({
  timestamps: true,
})
export class Booking {
  @Prop({ required: true })
  createdBy : string;
  @Prop({ required: true })
  startDate : Date;
  @Prop({ required: true })
  endDate : Date;
  @Prop({ required: true })
  lockId : string;
  @Prop({ required: true })
  conatctId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
