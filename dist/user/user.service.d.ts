import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findByUsername(username: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    find(): Promise<User[]>;
    create(usernameHash: string, username: string, ttLockHash: string, password: string, date: string, fullName: string): Promise<UserDocument>;
    update(id: string, user: Object): Promise<UserDocument>;
}
