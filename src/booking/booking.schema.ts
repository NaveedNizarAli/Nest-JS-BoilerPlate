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
  @Prop({type: [Object]})
  lockIds: Array<object>;
  @Prop({required: true })
  homeId: string;
  @Prop({ required: true })
  contactId: string;
  @Prop({ required: true })
  contactName: string;
  @Prop({ required: true, default: false })
  delete: Boolean;
  @Prop({required : true})
  created : Number;
  @Prop({required : true})
  updated : Number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
