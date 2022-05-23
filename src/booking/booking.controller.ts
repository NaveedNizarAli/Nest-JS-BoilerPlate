import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDTO } from './dtos/create-booking.dto';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post('create')
    async create(@Body() booking: CreateBookingDTO) {
        let data = await this.bookingService.create(booking);
        if(data._id){
            return {
              success : true,
              message : 'contact successfully created',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'contact unable to create',
                error   : 'contact unable to create',
            }
        }
    }
}
