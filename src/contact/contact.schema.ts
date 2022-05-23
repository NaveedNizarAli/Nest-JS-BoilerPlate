import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop({ required: true })
  fullName : string;
  @Prop({ required: true })
  dialingCode : string;
  @Prop({ required: true })
  phoneNumber : string;
  @Prop({ required: true, default: false })
  delete : string;
  @Prop({ required: true })
  completePhoneNumber : string;
  @Prop({ required: true, unique: true })
  email : string;
  @Prop({type: [String]})
  createdBy: Array<string>;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
