import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

        let locks = await this.bookingService.getLocks(booking.homeId);
        
        if(locks.length > 0){
            
            let index = 0;
            let pwd : number;
            let successArray = [];
            for (const item of locks) {
                if(item._id) {
                    params.append('accessToken', access_token);
                    params.append('lockId', item.lockId);
                    params.append('startDate', booking.startDate.toString());
                    params.append('endDate', booking.endDate.toString());
                    params.append('keyboardPwdName', booking.contactName);
                    params.append('keyboardPwdType', '3');
                    params.append('date', new Date().valueOf().toString());
            
                    delete booking.accessToken;
                    
                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
        
                    let url : string;
                    if(index === 0){ 
                        url = 'https://euapi.ttlock.com/v3/keyboardPwd/get'; 
                        console.log('params', index, params)
                    } 
                    else {
                        url = 'https://euapi.ttlock.com/v3/keyboardPwd/add'; 
                        params.append('keyboardPwd', pwd.toString());
                        params.delete('keyboardPwdType');
                        console.log('params', index, params)
                    }

                    let enterpassreult = await firstValueFrom(this.httpService.post(url, params , config)).then( response =>{
                        console.log('response', response.data);
                        if(index === 0) {pwd = response.data.keyboardPwd}
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
                        // booking['keyboardPwdId'] = enterpassreult.data.keyboardPwdId;
                        // booking['keyboardPwd'] = index === 0 ? enterpassreult.data.keyboardPwd : pwd;
                        
                        successArray.push({
                            keyboardPwdId : enterpassreult.data.keyboardPwdId,
                            keyboardPwd   : index === 0 ? enterpassreult.data.keyboardPwd : pwd,
                            lockId        : item.lockId,
                            lockIdObject  : item._id
                        })


                    }

                    index = index + 1;
                }          
            }

            booking['lockIds'] = successArray;
            let data = await this.bookingService.create(booking);
            console.log('data', data);
            if(data._id && index === (successArray.length)) {
                return {
                    success : true,
                    message : 'booking successfully created',
                    error   : '',
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

    @Put('/delete/:id')
    async delete(@Param('id') id: string) {
        
        let data =  await this.bookingService.deleteBooking(id);
        if(data._id){
            return {
                success : true,
                message : 'booking successfully delete',
                data : data
            }
            }
            else{
            return {
                success : false,
                message : 'booking unable to delete',
                error   : 'booking unable to delete',
            }
        }
    }
}
