import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { PasscodeService } from './passcode.service';
import { CreatePassCodeDTO } from './dtos/create-passcode.dto';
import { CreateCustomPassCodeDTO } from './dtos/create-custompasscode.dto';

@Controller('passcode')
export class PasscodeController {
    constructor(private PasscodeService: PasscodeService, private readonly httpService: HttpService) {}

    @Post('create')
    async create(@Body() passcode: CreatePassCodeDTO): Promise<any> {
        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        console.log('passcode', passcode);

        let access_token = passcode.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', passcode.lockId);
        params.append('startDate', passcode.startDate.toString());
        params.append('endDate', passcode.endDate.toString());
        params.append('keyboardPwdName', passcode.keyboardPwdName);
        params.append('keyboardPwdType', passcode.keyboardPwdType.toString());
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }


        let data = await firstValueFrom(this.httpService.post('https://euapi.ttlock.com/v3/keyboardPwd/get', params , config)).then( response =>{
            console.log('response', response.data);
            if(response){
                if(response.data.keyboardPwdId) return {success: true, error: '', message : 'passcode created succesfully', data: response.data};
                else return {success: false, error: 'unable to create passcode ', message : 'unable to create passcode', data: ''};
           }
        });


        if(data.success){ 
            let passcodeData = {
                createdBy       : passcode.createdBy,
                startDate       : passcode.startDate,
                endDate         : passcode.endDate,
                lockId          : passcode.lockId,
                keyboardPwdType : passcode.keyboardPwdType,
                keyboardPwdName : passcode.keyboardPwdName,
                keyboardPwd     : data.data.keyboardPwd,
                keyboardPwdId   : data.data.keyboardPwdId
            } 
            return this.PasscodeService.create(passcodeData).then((res)=>{
                console.log('res', res);
                if(res._id) {
                    return {
                        success : true,
                        message : 'passcode successfully created',
                        error   : '',
                        data    : {...passcodeData, _id: res._id, created: new Date().valueOf(), updated : new Date().valueOf()}
                    }
                }
                else{
                    return {
                        success : false,
                        message : 'unable to create passcode',
                        error   : 'unable to create passcode',
                        data    : ''
                    }
                }
             })
        }
        else{
            return data;
        }

    }

    @Post('createcustom')
    async createrandom(@Body() passcode: CreateCustomPassCodeDTO): Promise<any> {
        const params = new URLSearchParams();
        params.append('clientId',  EnterPassConfig.clientId);

        let access_token = passcode.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', passcode.lockId);
        params.append('startDate', passcode.startDate.toString());
        params.append('endDate', passcode.endDate.toString());
        params.append('keyboardPwdName', passcode.keyboardPwdName);
        params.append('keyboardPwd', passcode.keyboardPwd.toString());
        params.append('date', new Date().valueOf().toString());

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }


        let data = await firstValueFrom(this.httpService.post('https://euapi.ttlock.com/v3/keyboardPwd/add', params , config)).then( response =>{
            console.log('response', response.data);
            if(response){
                if(response.data.keyboardPwdId) return {success: true, error: '', message : 'custom passcode created succesfully', data: response.data};
                else return {success: false, error: 'unable to create custom passcode ', message : 'unable to create custom passcode', data: ''};
           }
        });


        if(data.success){ 
            let passcodeData = {
                createdBy       : passcode.createdBy,
                startDate       : passcode.startDate,
                endDate         : passcode.endDate,
                lockId          : passcode.lockId,
                keyboardPwdName : passcode.keyboardPwdName,
                keyboardPwd     : passcode.keyboardPwd,
                keyboardPwdId   : data.data.keyboardPwdId
            } 
            return this.PasscodeService.create(passcodeData).then((res)=>{
                console.log('res', res);
                if(res._id) {
                    return {
                        success : true,
                        message : 'custom passcode successfully created',
                        error   : '',
                        data    : {...passcodeData, _id: res._id, created: new Date().valueOf(), updated : new Date().valueOf()}
                    }
                }
                else{
                    return {
                        success : false,
                        message : 'unable to create custom passcode',
                        error   : 'unable to create custom passcode',
                        data    : ''
                    }
                }
             })
        }
        else{
            return data;
        }

    }

    
}
