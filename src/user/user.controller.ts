import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Post, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { NewEnterPassUserDTO } from './dtos/new-enterpass-user.dto';
import * as crypto from 'crypto';
import { EnterPassConfig } from 'src/enums/enterpassAppIds';
import { ExistingUserDTO } from './dtos/existing-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private readonly httpService: HttpService) {}


  @Post('register')
  root(@Body() user: NewEnterPassUserDTO): Observable<AxiosResponse<any>>  {
   
    let userData = {...user};
    
    var usernameHash = crypto.createHash('md5').update(userData.username).digest('hex');
    var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');

    console.log('usernameHash',usernameHash)
    console.log('passwordHash',passwordHash)    

    userData = {...userData, username: usernameHash, password: passwordHash}

      const params = new URLSearchParams();
     
      console.log(EnterPassConfig.clientId);
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

      console.log(EnterPassConfig.clientId);
      params.append('client_id', EnterPassConfig.clientId);
      params.append('client_secret', EnterPassConfig.clientSecret);
      params.append('username', EnterPassConfig.prefix +'_'+ usernameHash);
      params.append('password', passwordHash);

      console.log('params', params);
      
   
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    return this.httpService.post('https://api.ttlock.com/oauth2/token', params , config).pipe( map(response => {
      console.log('response', response.data);
      if(response) {
        if(!response.data.access_token) {
          // this.userService.update(user)
        }
        return response.data
      }
    }));

  }


}
