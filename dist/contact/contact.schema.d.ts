/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type ContactDocument = Contact & Document;
export declare class Contact {
    fullName: string;
    dialingCode: string;
    phoneNumber: string;
    delete: Boolean;
    completePhoneNumber: string;
    email: string;
    createdBy: Array<string>;
}
export declare const ContactSchema: import("mongoose").Schema<Document<Contact, any, any>, import("mongoose").Model<Document<Contact, any, any>, any, any, any>, any, any>;
