/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type FingerprintDocument = Fingerprint & Document;
export declare class Fingerprint {
    createdBy: string;
    startDate: Number;
    endDate: Number;
    lockId: string;
    fingerprintNumber: Number;
    fingerprintName: string;
    fingerprintType: Number;
    fingerprintId: Number;
    delete: Boolean;
    created: Number;
    updated: Number;
}
export declare const BookingSchema: import("mongoose").Schema<Document<Fingerprint, any, any>, import("mongoose").Model<Document<Fingerprint, any, any>, any, any, any>, any, any>;
