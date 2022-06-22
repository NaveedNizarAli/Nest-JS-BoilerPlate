import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { DeleteLockDTO } from './dtos/delete-lock.dto';
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

        if(data.success){
            let result = await firstValueFrom(this.httpService.get('https://api.ttlock.com/v3/lock/detail?clientId='+EnterPassConfig.clientId+'&accessToken='+access_token+'&lockId='+data.lockId +'&date='+ new Date().valueOf())).then( response =>{
                console.log('response', response);  
                if(response && response.data.lockId) {
                        return this.lockService.create({lockData : {...response.data}, created: new Date().valueOf(), updated : new Date().valueOf(), createdBy : lock.createdBy, lockId: response.data.lockId, lockDataString : lock.lockData}).then((res)=>{
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
