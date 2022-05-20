/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type BookingDocument = Booking & Document;
export declare class Booking {
    createdBy: string;
    startDate: Date;
    endDate: Date;
    lockId: string;
    conatctId: string;
}
export declare const BookingSchema: import("mongoose").Schema<Document<Booking, any, any>, import("mongoose").Model<Document<Booking, any, any>, any, any, any>, any, any>;
