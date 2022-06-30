import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockSchema } from 'src/lock/lock.schema';
import { BookingController } from './booking.controller';
import { BookingSchema } from './booking.schema';
import { BookingService } from './booking.service';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }, {name : 'Lock', schema : LockSchema}])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
