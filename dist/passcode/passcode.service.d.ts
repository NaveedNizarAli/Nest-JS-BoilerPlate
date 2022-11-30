import { PasscodeDocument } from './passcode.schema';
import { Model } from 'mongoose';
import { LockDocument } from 'src/lock/lock.schema';
export declare class PasscodeService {
    private readonly passcodeModel;
    private readonly lockModel;
    constructor(passcodeModel: Model<PasscodeDocument>, lockModel: Model<LockDocument>);
    create(passcodeData: Object, endDate: Number): Promise<PasscodeDocument>;
    getall(createdBy: string): Promise<any>;
}
