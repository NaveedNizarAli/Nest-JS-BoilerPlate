/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type BookingDocument = Booking & Document;
export declare class Booking {
    createdBy: string;
    startDate: Number;
    endDate: Number;
    lockIds: Array<object>;
    homeId: string;
    contactId: string;
    contactName: string;
    delete: Boolean;
    created: Number;
    updated: Number;
}
export declare const BookingSchema: import("mongoose").Schema<Document<Booking, any, any>, import("mongoose").Model<Document<Booking, any, any>, any, any, any>, any, any>;
