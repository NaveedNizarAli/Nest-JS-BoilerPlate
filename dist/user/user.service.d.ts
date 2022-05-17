import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    _getUserDetails(user: UserDocument): UserDetails;
    findByUsername(username: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    find(): Promise<User[]>;
    create(username: string, password: string, date: string): Promise<UserDocument>;
    update(id: string, user: Object): Promise<UserDocument>;
}
