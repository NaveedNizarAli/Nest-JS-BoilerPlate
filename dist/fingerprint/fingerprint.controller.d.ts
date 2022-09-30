import { HttpService } from '@nestjs/axios';
import { FingerprintService } from './fingerprint.service';
import { CreateFingerPrintDTO } from './dtos/create-fingerprint.dto';
import { DeleteFingerPrintDTO } from './dtos/delete-lock.dto';
export declare class FingerprintController {
    private fingerprintService;
    private readonly httpService;
    constructor(fingerprintService: FingerprintService, httpService: HttpService);
    create(fingerprint: CreateFingerPrintDTO): Promise<any>;
    findAll(createdBy: string): Promise<{
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
    delete(fingerprint: DeleteFingerPrintDTO): Promise<any>;
}
