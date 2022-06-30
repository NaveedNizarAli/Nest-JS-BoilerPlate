import { Model } from 'mongoose';
import { BookingDocument } from 'src/booking/booking.schema';
import { LockDocument } from './lock.schema';
export declare class LockService {
    private readonly lockModel;
    private readonly bookingModel;
    constructor(lockModel: Model<LockDocument>, bookingModel: Model<BookingDocument>);
    create(lock: object): Promise<any>;
    getByLockId(id: string): Promise<LockDocument | null>;
    getByCreatedBy(createdBy: string): Promise<any>;
    getall(): Promise<any>;
    update(id: string, lock: Object): Promise<LockDocument>;
    delete(id: string): Promise<any>;
}
