import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockSchema } from 'src/lock/lock.schema';
import { FingerprintController } from './fingerprint.controller';
import { BookingSchema } from './fingerprint.schema';
import { FingerprintService } from './fingerprint.service';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Fingerprint', schema: BookingSchema }])],
  controllers: [FingerprintController],
  providers: [FingerprintService],
  exports: [FingerprintService],
})
export class BookingModule {}
