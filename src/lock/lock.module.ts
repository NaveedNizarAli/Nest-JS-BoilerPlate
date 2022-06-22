import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockController } from './lock.controller';
import { LockSchema } from './lock.schema';
import { LockService } from './lock.service';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Lock', schema: LockSchema }])],
  controllers: [LockController],
  providers: [LockService],
  exports: [LockService],
})
export class LockModule {}
