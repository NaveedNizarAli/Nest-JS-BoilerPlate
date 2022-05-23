import { BookingService } from './booking.service';
import { CreateBookingDTO } from './dtos/create-booking.dto';
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    create(booking: CreateBookingDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./booking.schema").BookingDocument;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    getCreatedBy(createdBy: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
}
