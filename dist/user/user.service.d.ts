import { Model } from 'mongoose';
import { BookingDocument } from 'src/booking/booking.schema';
import { ContactDocument } from 'src/contact/contact.schema';
import { HomeDocument } from 'src/home/home.schema';
import { LockDocument } from 'src/lock/lock.schema';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
export declare class UserService {
    private readonly userModel;
    private readonly bookingModel;
    private readonly contactModal;
    private readonly homeModel;
    private readonly lockModel;
    constructor(userModel: Model<UserDocument>, bookingModel: Model<BookingDocument>, contactModal: Model<ContactDocument>, homeModel: Model<HomeDocument>, lockModel: Model<LockDocument>);
    findByUsername(username: string): Promise<UserDocument | null>;
    findByUsernameSignup(username: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    find(): Promise<User[]>;
    create(usernameHash: string, username: string, ttLockHash: string, password: string, date: string, fullName: string): Promise<UserDocument>;
    update(id: string, user: Object): Promise<UserDocument>;
    delete(id: string): Promise<UserDocument>;
    deleteBooking(id: string): Promise<any>;
    deleteContact(id: string): Promise<any>;
    deleteHome(id: string): Promise<any>;
    deleteLock(id: string): Promise<any>;
}
