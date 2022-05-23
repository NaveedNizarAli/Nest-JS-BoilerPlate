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
  startDate : Number;
  @Prop({ required: true })
  endDate : Number;
  @Prop({ })
  lockId : string;
  @Prop({ required: true })
  contactId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
