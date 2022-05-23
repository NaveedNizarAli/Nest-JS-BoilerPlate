import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './contact.schema';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
