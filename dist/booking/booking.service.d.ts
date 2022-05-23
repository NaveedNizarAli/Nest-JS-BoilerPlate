import { BookingDocument } from './booking.schema';
import { Model } from 'mongoose';
export declare class BookingService {
    private readonly bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    create(booking: Object): Promise<BookingDocument>;
    getall(): Promise<any>;
    getByCreatedBy(createdBy: string): Promise<any>;
}
