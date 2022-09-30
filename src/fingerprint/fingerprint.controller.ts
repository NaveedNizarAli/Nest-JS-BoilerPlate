import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FingerprintService } from './fingerprint.service';
import { CreateFingerPrintDTO } from './dtos/create-fingerprint.dto';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { firstValueFrom } from 'rxjs';
import { DeleteFingerPrintDTO } from './dtos/delete-lock.dto';

@Controller('fingerprint')
export class FingerprintController {
    constructor(private fingerprintService: FingerprintService, private readonly httpService: HttpService) {}

    @Post('create')
    async create(@Body() fingerprint: CreateFingerPrintDTO): Promise<any> {
        console.log('create');
        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = fingerprint.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', fingerprint.lockId);
        params.append('startDate', fingerprint.startDate.toString());
        params.append('endDate', fingerprint.endDate.toString());
        params.append('fingerprintNumber', fingerprint.fingerprintNumber);
        params.append('fingerprintType', '1');
        params.append('fingerprintName', fingerprint.fingerprintName);
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }


        let data = await firstValueFrom(this.httpService.post('https://euapi.ttlock.com/v3/fingerprint/add', params , config)).then( response =>{
            console.log('response', response.data);
            if(response){
                if(response.data.fingerprintId) return {success: true, error: '', message : 'fingerprint created succesfully', data: response.data.fingerprintId};
                else return {success: false, error: 'unable to create fingerprint ', message : 'unable to create fingerprint', data: ''};
           }
        });


        if(data.success){ 
            let fingerprintData = {
                createdBy         : fingerprint.createdBy,
                startDate         : fingerprint.startDate,
                endDate           : fingerprint.endDate,
                lockId            : fingerprint.lockId,
                fingerprintNumber : parseInt(fingerprint.fingerprintNumber),
                fingerprintName   : fingerprint.fingerprintName,
                fingerprintType   : 1,
                fingerprintId     : data.data
            } 
            return this.fingerprintService.create(fingerprintData).then((res)=>{
                console.log('res', res);
                if(res._id) {
                    console.log('_id')
                    return {
                        success : true,
                        message : 'fingerprint successfully created',
                        error   : '',
                        data    : {...fingerprintData, _id: res._id, created: new Date().valueOf(), updated : new Date().valueOf()}
                    }
                }
                else{
                    return {
                        success : false,
                        message : 'unable to create fingerprint',
                        error   : 'unable to create fingerprint',
                        data    : ''
                    }
                }
             })
        }
        else{
            return data;
        }

    }

    @Get('getbylockid/:createdBy')
    async findAll(@Param('createdBy') createdBy: string) {
        let data = await this.fingerprintService.getall(createdBy);
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
  
    @Post('delete')
    async delete(@Body() fingerprint: DeleteFingerPrintDTO): Promise<any> {
        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = fingerprint.accessToken.split(' ')[1];
        params.append('accessToken', access_token); 
        params.append('fingerprintId', fingerprint.fingerprintId.toString());
        params.append('lockId', fingerprint.lockId);
        params.append('date', new Date().valueOf().toString());


        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        let data = await firstValueFrom(this.httpService.post('https://euapi.ttlock.com/v3/fingerprint/delete', params , config)).then( response =>{
            console.log('response', response);
            if(response){
                if(response.data.errcode === 0) return {success: true, error: '', message : 'fingerprint successfully deleted', data: response.data};
                else return {success: false, error: 'unable to delete fingerprint ', message : 'unable to delete fingerprint', data: ''};
           }
        });


        if(data.success){ 
            return this.fingerprintService.delete(fingerprint._id).then((res)=>{
                console.log('res', res);
                if(res === null)  return {success: false, error: 'unable to delete fingerprint ', message : 'unable to delete fingerprint', data: ''};
                if(res && res._id) return {success: true, message : 'fingerprint successfully deleted', error : '', data : res};
                else return {success: false, error: 'unable to delete fingerprint ', message : 'unable to delete fingerprint', data: ''};
             })
        } 


    }
}
