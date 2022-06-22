import { HttpService } from '@nestjs/axios';
import { NewLockDTO } from './dtos/new-lock.dto';
import { LockService } from './lock.service';
export declare class LockController {
    private lockService;
    private readonly httpService;
    constructor(lockService: LockService, httpService: HttpService);
    create(lock: NewLockDTO): Promise<any>;
}
