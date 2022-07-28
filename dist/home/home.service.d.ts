import { HomeDocument } from "./home.schema";
import { Model } from 'mongoose';
import { BookingDocument } from "src/booking/booking.schema";
export declare class HomeService {
    private readonly homeModel;
    private readonly bookingModel;
    constructor(homeModel: Model<HomeDocument>, bookingModel: Model<BookingDocument>);
    create(home: Object): Promise<HomeDocument>;
    getall(): Promise<any>;
    getByCreatedBy(createdBy: string): Promise<any>;
    getBookingbyHomeID(homeId: string): Promise<any>;
    delete(id: string): Promise<any>;
}
