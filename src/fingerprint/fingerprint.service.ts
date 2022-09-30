import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FingerprintDocument } from './fingerprint.schema';
import { Model } from 'mongoose';


@Injectable()
export class FingerprintService {
    constructor(
        @InjectModel('Fingerprint') private readonly fingerprintModel: Model<FingerprintDocument>,
    ) {}

    async create(fingerprintData : Object) : Promise<FingerprintDocument> {
        console.log('newFingerprint', fingerprintData);
        const newFingerprint = new this.fingerprintModel({...fingerprintData, created: new Date().valueOf(), updated : new Date().valueOf()});
        return newFingerprint.save();   
    }

    async getall(createdBy: string) : Promise<any> {
        return await this.fingerprintModel.find({
            createdBy : createdBy,
            delete    : false
        });
    }

    async delete(id: string): Promise<any> {
        let fingerprint = await this.fingerprintModel.findByIdAndDelete(id).exec();
        return fingerprint;
    }

}
