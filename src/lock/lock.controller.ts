import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { NewLockDTO } from './dtos/new-lock.dto';
import { LockService } from './lock.service';

@Controller('lock')
export class LockController {
    constructor(private lockService: LockService, private readonly httpService: HttpService) {}

    @Post('create')
    async create(@Body() lock: NewLockDTO): Promise<any> {
        let lockData = {...lock};  

        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = lock.accessToken.split(' ')[1]

        params.append('accessToken', access_token);
        params.append('lockData', lock.lockData);
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }



        let data = await firstValueFrom(this.httpService.post('https://api.ttlock.com/v3/lock/initialize', params , config)).then( response =>{
           if(response){
                return this.lockService.getById(response.data.lockId).then((lockResponse)=>{
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
            let result = await firstValueFrom(this.httpService.get('https://api.ttlock.com/v3/lock/detail?clientId='+EnterPassConfig.clientId+'&accessToken='+lock.accessToken+'&lockId='+data.lockId +'&date='+ new Date().valueOf())).then( response =>{
                    if(response && response.data.lockId) {
                        return this.lockService.create({lockData : {...response.data}, createdBy : lock.createdBy, lockId: response.data.lockId}).then((res)=>{
                            return {sucess: true, message : 'lock initialized successfully', error : '', data : res}
                        })    
                    }
                })

            return result;
        }
        else {
            return data;
        }
        


    }

}
