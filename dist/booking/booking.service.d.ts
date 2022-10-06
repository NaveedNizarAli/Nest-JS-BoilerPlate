import { BookingDocument } from './booking.schema';
import { Model } from 'mongoose';
import { LockDocument } from 'src/lock/lock.schema';
export declare class BookingService {
    private readonly bookingModel;
    private readonly lockModel;
    constructor(bookingModel: Model<BookingDocument>, lockModel: Model<LockDocument>);
    create(booking: Object): Promise<BookingDocument>;
    getall(): Promise<any>;
    getByCreatedBy(createdBy: string): Promise<any>;
    getLocks(homeId: string): Promise<any>;
    deleteBooking(id: string): Promise<any>;
}
