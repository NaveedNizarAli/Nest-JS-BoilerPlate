/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type LockDocument = Lock & Document;
export declare class Lock {
    createdBy: string;
    lockId: string;
    lockData: object;
    lockDataString: string;
    delete: Boolean;
}
export declare const LockSchema: import("mongoose").Schema<Document<Lock, any, any>, import("mongoose").Model<Document<Lock, any, any>, any, any, any>, any, any>;
