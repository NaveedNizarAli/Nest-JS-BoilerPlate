import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
              message : 'booking successfully created',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'booking unable to create',
                error   : 'booking unable to create',
            }
        }
    }

    @Get('getall')
    async findAll() {
        let data = await this.bookingService.getall();
        if(data.length > 0){
            return {
              success : true,
              message : 'bookings successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find bookings',
                error   : 'unable to find bookings',
            }
        }
    }

    @Get('/createdBy/:createdBy')
    async getCreatedBy(@Param('createdBy') createdBy: string) {
        let data = await this.bookingService.getByCreatedBy(createdBy);
        if(data.length > 0){
            return {
              success : true,
              message : 'bookings successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find bookings',
                error   : 'unable to find bookings',
            }
        }
    }
}
