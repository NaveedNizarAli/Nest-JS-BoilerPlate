import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { BookingService } from './booking.service';
import { CreateBookingDTO } from './dtos/create-booking.dto';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService, private readonly httpService: HttpService) {}

    @Post('create')
    async create(@Body() booking: CreateBookingDTO): Promise<any> {



        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = booking.accessToken.split(' ')[1]

        params.append('accessToken', access_token);
        params.append('lockId', booking.enterpassLockId);
        params.append('startDate', booking.startDate.toString());
        params.append('endDate', booking.endDate.toString());
        params.append('keyboardPwdType', '2');
        params.append('keyboardPwdName', booking.contactName);
        params.append('date', new Date().valueOf().toString());

        delete booking.accessToken;
        delete booking.enterpassLockId;
        
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        console.log('params', params);

        let enterpassreult = await firstValueFrom(this.httpService.post('https://api.ttlock.com/v3/keyboardPwd/get', params , config)).then( response =>{
            console.log('response', response.data);
            if(response.data && response.data.keyboardPwdId){
                return {success: true, message : 'booking successfully created', data: response.data};
            }
            return {
                success : false,
                message : 'booking unable to create',
                error   : 'booking unable to create',
                data    : ''
            }
        })

        if(enterpassreult.success){
            booking['keyboardPwdId'] = enterpassreult.data.keyboardPwdId;
            booking['keyboardPwd'] = enterpassreult.data.keyboardPwd;
            let data = await this.bookingService.create(booking);
            if(data._id){
                return {
                    success : true,
                    error   : '',
                    message : 'booking successfully created',
                    data    : data
                }
            }
            else{
                return {
                    success : false,
                    message : 'booking unable to create',
                    error   : 'booking unable to create',
                    data    : ''
                }
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
