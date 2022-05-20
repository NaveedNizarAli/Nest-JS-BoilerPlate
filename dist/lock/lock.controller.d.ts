import { HttpService } from '@nestjs/axios';
import { LockService } from './lock.service';
export declare class LockController {
    private lockService;
    private readonly httpService;
    constructor(lockService: LockService, httpService: HttpService);
}
