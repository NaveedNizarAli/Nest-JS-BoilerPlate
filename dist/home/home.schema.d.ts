/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type HomeDocument = Home & Document;
export declare class Home {
    createdBy: string;
    homeImages: Array<string>;
    homeName: string;
    homeAddress: string;
    delete: Boolean;
    created: Number;
    updated: Number;
}
export declare const HomeSchema: import("mongoose").Schema<Document<Home, any, any>, import("mongoose").Model<Document<Home, any, any>, any, any, any>, any, any>;
