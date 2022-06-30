import { HttpService } from '@nestjs/axios';
import { DeleteLockDTO } from './dtos/delete-lock.dto';
import { GetRecordsDTO } from './dtos/get-records.dto';
import { NewLockDTO } from './dtos/new-lock.dto';
import { LockService } from './lock.service';
export declare class LockController {
    private lockService;
    private readonly httpService;
    constructor(lockService: LockService, httpService: HttpService);
    create(lock: NewLockDTO): Promise<any>;
    getByLockId(lockId: string): Promise<{
        success: boolean;
        message: string;
        data: import("./lock.schema").LockDocument;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    getCreatedBy(createdBy: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    getRecords(lock: GetRecordsDTO): Promise<any>;
    delete(lock: DeleteLockDTO): Promise<any>;
}
