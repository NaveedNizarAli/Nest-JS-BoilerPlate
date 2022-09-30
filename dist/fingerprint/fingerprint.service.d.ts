import { FingerprintDocument } from './fingerprint.schema';
import { Model } from 'mongoose';
export declare class FingerprintService {
    private readonly fingerprintModel;
    constructor(fingerprintModel: Model<FingerprintDocument>);
    create(fingerprint: Object): Promise<FingerprintDocument>;
    getall(createdBy: string): Promise<any>;
    delete(id: string): Promise<any>;
}
