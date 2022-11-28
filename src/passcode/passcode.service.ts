import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasscodeDocument } from './passcode.schema';
import { Model } from 'mongoose';
import { LockDocument } from 'src/lock/lock.schema';


@Injectable()
export class PasscodeService {
    constructor(
        @InjectModel('Passcode') private readonly passcodeModel: Model<PasscodeDocument>,
        @InjectModel('Lock') private readonly lockModel: Model<LockDocument>,
    ) {}

    async create(passcodeData : Object, endDate: Number) : Promise<PasscodeDocument> {
        let newPasscode;
        if(endDate){
            newPasscode = new this.passcodeModel({...passcodeData, created: new Date().valueOf(), endDate: endDate, updated : new Date().valueOf()});
        }
        else{ 
            newPasscode = new this.passcodeModel({...passcodeData, created: new Date().valueOf(), updated : new Date().valueOf()});
        }
        
        return newPasscode.save(); 
    }

   
}
