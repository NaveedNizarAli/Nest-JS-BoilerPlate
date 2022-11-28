import { HttpService } from '@nestjs/axios';
import { PasscodeService } from './passcode.service';
import { CreatePassCodeDTO } from './dtos/create-passcode.dto';
export declare class PasscodeController {
    private PasscodeService;
    private readonly httpService;
    constructor(PasscodeService: PasscodeService, httpService: HttpService);
    create(passcode: CreatePassCodeDTO): Promise<any>;
}
