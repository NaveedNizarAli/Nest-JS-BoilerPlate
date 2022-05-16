import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Post, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { NewEnterPassUserDTO } from './dtos/new-enterpass-user.dto';
import * as crypto from 'crypto';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { RefreshTokenDTO } from './dtos/refresh_token.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private readonly httpService: HttpService) {}


  @Post('register')
  register(@Body() user: NewEnterPassUserDTO): Observable<AxiosResponse<any>>  {
   
    let userData = {...user};
    
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
          this.userService.create(response.data.username, userData.password, userData.date)
        }
        return response.data
      }
    }));
    return data;
  }

  @Post('login')
  login(@Body() user: ExistingUserDTO): Observable<AxiosResponse<any>>  {
   
    let userData = {...user};
    
    var usernameHash = crypto.createHash('md5').update(userData.username).digest('hex');
    var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');

    
    userData = {...userData, username: usernameHash, password: passwordHash}

      const params = new URLSearchParams();

      params.append('client_id', EnterPassConfig.clientId);
      params.append('client_secret', EnterPassConfig.clientSecret);
      params.append('username', EnterPassConfig.prefix +'_'+ usernameHash);
      params.append('password', passwordHash);
      
   
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    return this.httpService.post('https://api.ttlock.com/oauth2/token', params , config).pipe( map(response => {
      if(response) {
        if(response.data.access_token) {
          let username = EnterPassConfig.prefix +'_'+ usernameHash
          return this.userService.findByUsername(username).then((res)=>{
              let user =  {   uid           : response.data.uid, 
                              openid        : response.data.openid,
                              scope         : response.data.scope,
                              refresh_token : response.data.refresh_token,
                              access_token  : response.data.token_type + ' ' +response.data.access_token,
                          };
            return this.userService.update(res._id, user).then((res)=>{
                return res;
            });
          })
        }
        else{
          return response.data
        }
      }
    }));

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
            return res;
        });
        }
        return response.data
      }
    }));

  }


}
