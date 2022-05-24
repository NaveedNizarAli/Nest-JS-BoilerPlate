import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';
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
    console.log('body', user);
    
    var usernameHash = crypto.createHash('md5').update(userData.username).digest('hex');
    var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');

    userData = {...userData, username: usernameHash, password: passwordHash}

      const params = new URLSearchParams();
     
      params.append('clientId', EnterPassConfig.clientId);
      params.append('clientSecret', EnterPassConfig.clientSecret);
      params.append('date', user.date);
      params.append('username', usernameHash);
      params.append('password', passwordHash);
      
   
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    
    let data = this.httpService.post('https://api.ttlock.com/v3/user/register', params , config).pipe( map(response => {
      if(response) {
        if(!response.data.errcode) {
          return this.userService.findByUsername(user.username).then((userResponse)=>{
            if(userResponse._id) {
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
        if(res && res._id){
          console.log('res', res);
          params.append('username', res.ttLockHash);
             
           const config = {
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }
           }
       
           return this.httpService.post('https://api.ttlock.com/oauth2/token', params , config).pipe( map(response => {
             if(!response.data.errcode) {
              console.log('response', response);
               if(response.data.access_token) {
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
        console.log('err', err);
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

    return this.httpService.post('https://api.ttlock.com/oauth2/token', params , config).pipe( map(response => {
      if(response) {
        console.log('response', response.data);
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


}
