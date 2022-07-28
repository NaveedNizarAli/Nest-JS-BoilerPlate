import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type HomeDocument = Home & Document;

@Schema({
  timestamps: true,
})
export class Home {
  @Prop({ required: true })
  createdBy : string;
  @Prop({type: [String]})
  homeImages: Array<string>;
  @Prop({required : true })
  homeName : string;
  @Prop({required : true })
  lat : Number;
  @Prop({required : true })
  lng : Number;
  @Prop({required : true })
  homeAddress : string;
  @Prop({required : true })
  locationName : string;
  @Prop({ required: true, default: false })
  delete: Boolean;
  @Prop({required : true})
  created : Number;
  @Prop({required : true})
  updated : Number;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
