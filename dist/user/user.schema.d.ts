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
    openid: number;
    scope: string;
    access_token: string;
    refresh_token: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
