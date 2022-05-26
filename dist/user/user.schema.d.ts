/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    usernameHash: string;
    ttLockHash: string;
    username: string;
    fullName: string;
    password: string;
    date: number;
    uid: number;
    locationName: string;
    longitude: number;
    latitude: number;
    oneSignalId: string;
    phoneNumber: string;
    dialingCode: string;
    openid: number;
    scope: string;
    access_token: string;
    refresh_token: string;
    delete: Boolean;
    userType: Array<number>;
    profileType: Array<number>;
    created: Number;
    updated: Number;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
