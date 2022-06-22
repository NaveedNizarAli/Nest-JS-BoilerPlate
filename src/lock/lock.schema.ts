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
}

export const LockSchema = SchemaFactory.createForClass(Lock);
