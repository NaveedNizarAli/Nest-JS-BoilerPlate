import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { DeleteLockDTO } from './dtos/delete-lock.dto';
import { GetRecordsDTO } from './dtos/get-records.dto';
import { NewLockDTO } from './dtos/new-lock.dto';
import { LockService } from './lock.service';

@Controller('lock')
export class LockController {
    constructor(private lockService: LockService, private readonly httpService: HttpService) {}

    @Post('create')
    async create(@Body() lock: NewLockDTO): Promise<any> {

        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = lock.accessToken.split(' ')[1]

        params.append('accessToken', access_token);
        params.append('lockData', lock.lockData);
        params.append('lockAlias', lock.lockName);
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }



        let data = await firstValueFrom(this.httpService.post('https://api.ttlock.com/v3/lock/initialize', params , config)).then( response =>{
           if(response){
                return this.lockService.getByLockId(response.data.lockId).then((lockResponse)=>{
                    console.log('response', lockResponse);
                    if( lockResponse && lockResponse._id) {
                        return {success: false, error: 'lock already initialized ', message : 'lock already initialized', data: ''};
                    }
                    else
                    {
                        return {success: true, error: 'unable to lock ', message : 'unable to find lock', lockId: response.data.lockId};
                    }
                })
           }
        });

        console.log('data', data);

        if(data.success){
            let result = await firstValueFrom(this.httpService.get('https://api.ttlock.com/v3/lock/detail?clientId='+EnterPassConfig.clientId+'&accessToken='+access_token+'&lockId='+data.lockId +'&date='+ new Date().valueOf())).then( response =>{
                console.log('response', response);  
                if(response && response.data.lockId) {
                        return this.lockService.create({lockData : {...response.data}, created: new Date().valueOf(), updated : new Date().valueOf(), createdBy : lock.createdBy, lockId: response.data.lockId, lockDataString : lock.lockData, homeId : lock.homeId}).then((res)=>{
                            return {success: true, message : 'lock initialized successfully', error : '', data : res}
                        })    
                    }
                })
             console.log('result', result);
            return result;
        }
        else {
            return data;
        }
        


    }

    @Get('/getByLockId/:lockId')
    async getByLockId(@Param('lockId') lockId: string) {
        let data = await this.lockService.getByLockId(lockId);
        if(data){
            return {
              success : true,
              message : 'locks successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find locks',
                error   : 'unable to find locks',
            }
        }
    }


    @Get('/createdBy/:createdBy')
    async getCreatedBy(@Param('createdBy') createdBy: string) {
        let data = await this.lockService.getByCreatedBy(createdBy);
        if(data.length > 0){
            return {
              success : true,
              message : 'locks successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find locks',
                error   : 'unable to find locks',
            }
        }
    }

    @Get('getall')
    async findAll() {
        let data = await this.lockService.getall();
        if(data.length > 0){
            return {
              success : true,
              message : 'locks successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find locks',
                error   : 'unable to find locks',
            }
        }
    }



    @Post('getlockRecords')
    async getRecords(@Body() lock: GetRecordsDTO): Promise<any> {
        
        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = lock.accessToken.split(' ')[1]

        params.append('accessToken', access_token);
        if(lock.records) params.append('records', lock.records);
        params.append('lockId', lock.lockId);
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const recordType ={
            1 : "unlock by app",

            4 : "unlock by passcode",

            5 : "Rise the lock (for parking lock)",

            6 : "Lower the lock (for parking lock)" ,

            7 : "unlock by IC card",

            8 : "unlock by fingerprint",

            9 : "unlock by wrist strap",

            10 : "unlock by Mechanical key",

            11 : "lock by app",

            12 : "unlock by gateway",

            29 : "apply some force on the Lock",

            30 : "Door sensor closed",

            31 : "Door sensor open",

            32 : "open from inside",

            33 : "lock by fingerprint",

            34 : "lock by passcode",

            35 : "lock by IC card",

            36 : "lock by Mechanical key",

            37 : "Remote Control",

            42 : "received new local mail",

            43 : "received new other cities' mail",

            44 : "Tamper alert",

            45 : "Auto Lock",

            46 : "unlock by unlock key",

            47 : "lock by lock key",

            48 : "System locked ( Caused by, for example: Using INVALID Passcode/Fingerprint/Card several times)",

            49 : "unlock by hotel card",

            50 : "Unlocked due to the high temperature",

            52 : "Dead lock with APP",

            53 : "Dead lock with passcode",

            54 : "The car left (for parking lock)",

            55 : "unlock with key fob",

            57 : "Unlock with QR code success",

            58 : "Unlock with QR code failed, it's expired",

            59 : "Double locked",

            60 : "Cancel double lock",

            61 : "Lock with QR code success",

            62 : "Lock with QR code failed, the lock is double locked",

            63 : "Auto unlock at passage mode"
        }


        let data;
        if(lock.records){
            data = await firstValueFrom(this.httpService.post('https://api.ttlock.com/v3/lockRecord/upload', params , config)).then((response)=>{
                console.log('response', response);
                if(response.data && response.data.errcode === 0 ) {
                    return {
                        success: true,
                        message : 'data uploaded successfully',
                        error : 'data uploaded successfully',
                    }
                }
            })
        }

        if((data && data.success) || !lock.records) {
            return await firstValueFrom(this.httpService.get('https://api.ttlock.com/v3/lockRecord/list?clientId='+EnterPassConfig.clientId+'&accessToken='+access_token+'&lockId='+lock.lockId +'&date='+ new Date().valueOf() + '&pageNo=1&pageSize=100')).then( response =>{
                if(response.data && response.data.list){
                    let index = 0;
                    for (const item of response.data.list) {
                        if(item.recordType) response.data.list[index].recordTypeString = recordType[response.data.list[index].recordType] || '';
                        response.data.list[index].objectId = response.data.list[index].lockDate.toString() + response.data.list[index].lockId.toString();
                        index = index + 1;
                    }
                    return {
                        success: true,
                        message : 'data found successfully',
                        error : 'data found successfully',
                        data : response.data
                    }
                }
                else {
                    return {
                        success: false,
                        message : 'unable to upload data',
                        error : 'unable to upload data',
                    }
                }
            })
        }

    }


    @Post('delete')
    async delete(@Body() lock: DeleteLockDTO): Promise<any> {

        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = lock.accessToken.split(' ')[1]

        params.append('accessToken', access_token);
        params.append('lockId', lock.lockId);
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }



        let data = await firstValueFrom(this.httpService.post('https://api.ttlock.com/v3/lock/delete', params , config)).then( response =>{
            console.log('res', response);
            if(response){
                if(response.data.errcode === 0) return {success: true, error: '', message : 'lock deleted', data: lock.lockId};
                else return {success: false, error: 'unable to delete lock ', message : 'unable to delete lock', data: ''};
           }
        });

        

        if(data.success){   
             return this.lockService.delete(lock._id).then((res)=>{
                console.log('res', res);
                if(res === null)  return {success: false, error: 'unable to delete lock ', message : 'unable to delete lock', data: ''};
                if(res && res._id) return {success: true, message : 'lock successfully deleted', error : '', data : res};
                else return {success: false, error: 'unable to delete lock ', message : 'unable to delete lock', data: ''};
             })
                  
        }
        else {
            return data;
        }
        


    }

}
