import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    _getUserDetails(user: UserDocument): UserDetails;
    findByUsername(usernameHash: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    find(): Promise<User[]>;
    create(usernameHash: string, username: string, password: string, date: string): Promise<UserDocument>;
    update(id: string, user: Object): Promise<UserDocument>;
}
