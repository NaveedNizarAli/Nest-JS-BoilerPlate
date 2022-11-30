import { HttpService } from '@nestjs/axios';
import { PasscodeService } from './passcode.service';
import { CreatePassCodeDTO } from './dtos/create-passcode.dto';
import { CreateCustomPassCodeDTO } from './dtos/create-custompasscode.dto';
export declare class PasscodeController {
    private PasscodeService;
    private readonly httpService;
    constructor(PasscodeService: PasscodeService, httpService: HttpService);
    create(passcode: CreatePassCodeDTO): Promise<any>;
    createrandom(passcode: CreateCustomPassCodeDTO): Promise<any>;
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
}
