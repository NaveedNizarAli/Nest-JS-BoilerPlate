import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from 'src/booking/booking.schema';
import { ContactSchema } from 'src/contact/contact.schema';
import { HomeSchema } from 'src/home/home.schema';
import { LockSchema } from 'src/lock/lock.schema';

import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Home', schema: HomeSchema }, { name: 'Lock', schema: LockSchema }, { name: 'Contact', schema: ContactSchema }, { name: 'Booking', schema: BookingSchema },{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
