import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockService } from 'src/lock/lock.service';
import { HomeController } from './home.controller';
import { HomeSchema } from './home.schema';
import { HomeService } from './home.service';


@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Home', schema: HomeSchema }])],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
})
export class HomeModule {}
