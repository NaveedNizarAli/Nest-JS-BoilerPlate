import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type LockDocument = Lock & Document;

@Schema({
  timestamps: true,
})
export class Lock {
  @Prop({ required: true })
  createdBy : string;
  @Prop({ required: true, unique: true })
  lockName : string;
  @Prop({ required: true })
  lockTyoe : string;
  @Prop({ required: true })
  lockDetail : string;
}

export const LockSchema = SchemaFactory.createForClass(Lock);
