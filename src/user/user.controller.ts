import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, elementAt, firstValueFrom, map, Observable } from 'rxjs';
import { NewEnterPassUserDTO } from './dtos/new-enterpass-user.dto';
import * as crypto from 'crypto';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { RefreshTokenDTO } from './dtos/refresh_token.dto';
import { UpdateUserEnterPass } from './dtos/update-user.dto';
import { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private readonly httpService: HttpService) {}


  @Post('register')
  register(@Body() user: NewEnterPassUserDTO): Observable<AxiosResponse<any>>  {
   
    let userData = {...user};
    
    var usernameHash = crypto.createHash('md5').update(userData.username).digest('hex');
    var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');

    userData = {...userData, username: usernameHash, password: passwordHash}

    function reverseString(str) {
      var splitString = str.split(""); // var splitString = "hello".split("");
      var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
      var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
      return joinArray; // "olleh
    }

      const params = new URLSearchParams();
      params.append('clientId', EnterPassConfig.clientId);
      params.append('clientSecret', EnterPassConfig.clientSecret);
      params.append('date', user.date);
      params.append('username', reverseString(usernameHash));
      params.append('password', passwordHash);
      
   
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    console.log('params',params);
    
    let data = this.httpService.post('https://euapi.ttlock.com/v3/user/register', params , config).pipe( map(response => {
      console.log('response signup', response.data)
      if(response) {
        if(!response.data.errcode) {
          return this.userService.findByUsername(user.username).then((userResponse)=>{
            if( userResponse && userResponse._id) {
              let user = {password: userData.password, date: userData.date, fullName: userData.fullName}
              this.userService.update(userResponse._id, user)
              return {
                success : true,
                message : 'user successfully signed up',
                data    : response.data
              };
            }
            else{
              this.userService.create(usernameHash, user.username, response.data.username,  userData.password, userData.date, user.fullName)
              return {
                success : true,
                message : 'user successfully signed up',
                data    : response.data
              };
            }
          })
        }
        else
        {
          return {success: false, error: response.data.errmsg, ...response.data}
        }
      }
    }));
    return data;
  }

  @Post('login')
  login(@Body() user: ExistingUserDTO): Promise<any>  {
   
    let userData = {...user};
    
    var usernameHashed = crypto.createHash('md5').update(userData.username).digest('hex');
    var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');

    userData = {...userData, username: usernameHashed, password: passwordHash}

      const params = new URLSearchParams();

      params.append('client_id', EnterPassConfig.clientId);
      params.append('client_secret', EnterPassConfig.clientSecret);
      params.append('password', passwordHash);

    
      return this.userService.findByUsername(user.username).then((res)=>{
        console.log('res', res);
        if(res && res._id){
          params.append('username', res.ttLockHash);
             
           const config = {
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }
           }

       
           return this.httpService.post('https://euapi.ttlock.com/oauth2/token', params , config).pipe( map(response => {
              if(!response.data.errcode) {
               if(response.data.access_token) {
                  console.log('response', response.data);
                        let user =  {   uid           : response.data.uid, 
                                        openid        : response.data.openid,
                                        scope         : response.data.scope,
                                        refresh_token : response.data.refresh_token,
                                        access_token  : response.data.token_type + ' ' +response.data.access_token,
                                    };

                          return this.userService.update(res._id, user).then((res)=>{
                              return {
                                success : true,
                                message : 'user successfully logged in',
                                data    : res
                              };
                          });

                   }
              }
              else{
                 return {success: false, error: response.data.errmsg, message :response.data.errmsg }
              }
           }));
        }
        else {
          return {success: false, error: 'unable to logged in', message: 'unable to logged in'}
        }
      }).catch((err)=>{
        return err
      })
    

  }

  @Post('refreshToken')
  RevokeToken(@Body() data: RefreshTokenDTO): Observable<AxiosResponse<any>>  {

      const params = new URLSearchParams();

      params.append('client_id', EnterPassConfig.clientId);
      params.append('client_secret', EnterPassConfig.clientSecret);
      params.append('refresh_token',  data.refresh_token);
      params.append('grant_type', 'refresh_token');
      
   
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    return this.httpService.post('https://euapi.ttlock.com/oauth2/token', params , config).pipe( map(response => {
      if(response) {
        if(response.data.access_token) {
          let user =  {  
                          refresh_token : response.data.refresh_token,
                          access_token  : response.data.token_type + ' ' +response.data.access_token,
                      };
          let id = data._id
          return this.userService.update(id, user).then((res)=>{
            return {
              success : true,
              message : 'user token successfully revoked',
              data    : res
            };
        });
        }
        else{
          return {success: false, error: response.data.errmsg, ...response.data}
        }
      }
    }));

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserEnterPass) {
    let data =  await this.userService.update(id, user);
    if(data._id){
      return {
        success : true,
        message : 'user successfully update',
        data : data
      }
    }
    else{
      return {
        success : false,
        message : 'user unable to update',
        error   : 'user unable to update',
      }
    }
  }

  @Put('/delete/:id')
  async delete(@Param('id') id: string, @Body() user: UpdateUserEnterPass): Promise<any> {
    
    
    let deleteBooking = await this.userService.deleteBooking(id);
    let deleteContact = await this.userService.deleteContact(id);
    let deleteHome    = await this.userService.deleteHome(id);
    let deleteLock    = await this.userService.deleteLock(id);

    console.log('deleteLock', deleteLock)

    let data =  await this.userService.delete(id);
    if(data._id){
      const params = new URLSearchParams();

      params.append('clientId', EnterPassConfig.clientId);
      params.append('clientSecret', EnterPassConfig.clientSecret);
      params.append('username', data.ttLockHash);
      params.append('date', new Date().valueOf().toString());
             
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      if(deleteLock && deleteLock.length > 0){
        let idx = 0;
        for (const element of deleteLock) {
          const params2 = new URLSearchParams();

          let access_token = user.accessToken.split(' ')[1];

          params2.append('clientId', EnterPassConfig.clientId);
          params2.append('accessToken', access_token);
          params2.append('lockId', element.lockId);
          params2.append('date', new Date().valueOf().toString());

          let deleteLockApi = await firstValueFrom(this.httpService.post('https://eueuapi.ttlock.com/v3/lock/delete', params2 , config)).then( response =>{
            console.log('response1', response)
          })

        }


        let deleteUser = await firstValueFrom(this.httpService.post('https://eueuapi.ttlock.com/v3/user/delete', params , config)).then( response =>{
          console.log('response2', response);  
          return {
              success : true,
              message : 'user successfully delete',
              data    : data
          }
        })
  
        return deleteUser;
      }
      else {
        let deleteUser = await firstValueFrom(this.httpService.post('https://eueuapi.ttlock.com/v3/user/delete', params , config)).then( response =>{
          console.log('response3', response);  
          return {
              success : true,
              message : 'user successfully delete',
              data    : data
          }
        })
  
        return deleteUser;
      }

    }
    else{
      return {
        success : false,
        message : 'user unable to delete',
        error   : 'user unable to delete',
      }
    }
  }


}
