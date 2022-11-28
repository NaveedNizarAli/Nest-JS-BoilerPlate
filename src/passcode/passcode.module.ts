import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockSchema } from 'src/lock/lock.schema';
import { PasscodeController } from './passcode.controller';
import { BookingSchema } from './passcode.schema';
import { PasscodeService } from './passcode.service';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Passcode', schema: BookingSchema }, {name : 'Lock', schema : LockSchema}])],
  controllers: [PasscodeController],
  providers: [PasscodeService],
  exports: [PasscodeService],
})
export class PasscodeModule {}
