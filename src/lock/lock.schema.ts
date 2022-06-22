import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type LockDocument = Lock & Document;

@Schema({
  timestamps: true,
})
export class Lock {
  @Prop({ required: true })
  createdBy : string;
  @Prop({ required: true })
  lockId : string;
  @Prop({required : true, type: Object })
  lockData : object;
  @Prop({required : true })
  lockDataString : string;
  @Prop({ required: true, default: false })
  delete: Boolean;
  @Prop({required : true, default : new Date().valueOf()})
  created : Number;
  @Prop({required : true, default: new Date().valueOf()})
  updated : Number;
}

export const LockSchema = SchemaFactory.createForClass(Lock);
