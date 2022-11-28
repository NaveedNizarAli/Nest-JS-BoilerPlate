/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type PasscodeDocument = Passcode & Document;
export declare class Passcode {
    createdBy: string;
    startDate: Number;
    endDate: Number;
    lockId: string;
    keyboardPwdType: Number;
    keyboardPwdName: string;
    keyboardPwd: string;
    keyboardPwdId: Number;
    delete: Boolean;
    created: Number;
    updated: Number;
}
export declare const BookingSchema: import("mongoose").Schema<Document<Passcode, any, any>, import("mongoose").Model<Document<Passcode, any, any>, any, any, any>, any, any>;
