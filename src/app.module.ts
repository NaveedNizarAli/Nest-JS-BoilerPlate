import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { LockModule } from './lock/lock.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { FingerprintModule } from './fingerprint/fingerprint.module';
import { PasscodeModule } from './passcode/passcode.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://enterpass:enterpass+Admin123@isystematic.hwgem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    UserModule,
    BookingModule,
    LockModule,
    ContactModule,
    HomeModule,
    FingerprintModule,
    PasscodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
