import { HttpService } from '@nestjs/axios';
import { Controller, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { NewLockDTO } from './dtos/new-lock.dto';
import { LockService } from './lock.service';

@Controller('lock')
export class LockController {
    constructor(private lockService: LockService, private readonly httpService: HttpService) {}

    // @Post('create')
    // create(@Body() lock: NewLockDTO): Observable<AxiosResponse<any>>  {
    //     return;  
    // }

}
