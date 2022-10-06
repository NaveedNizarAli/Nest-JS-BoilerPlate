import { Model } from 'mongoose';
import { BookingDocument } from 'src/booking/booking.schema';
import { ContactDocument } from 'src/contact/contact.schema';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';
export declare class UserService {
    private readonly userModel;
    private readonly bookingModel;
    private readonly contactModal;
    constructor(userModel: Model<UserDocument>, bookingModel: Model<BookingDocument>, contactModal: Model<ContactDocument>);
    findByUsername(username: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    find(): Promise<User[]>;
    create(usernameHash: string, username: string, ttLockHash: string, password: string, date: string, fullName: string): Promise<UserDocument>;
    update(id: string, user: Object): Promise<UserDocument>;
    delete(id: string): Promise<UserDocument>;
    deleteBooking(id: string): Promise<any>;
    deleteContact(id: string): Promise<any>;
}
