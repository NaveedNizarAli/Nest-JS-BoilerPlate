import { HttpService } from '@nestjs/axios';
import { BookingService } from './booking.service';
import { CreateBookingDTO } from './dtos/create-booking.dto';
export declare class BookingController {
    private bookingService;
    private readonly httpService;
    constructor(bookingService: BookingService, httpService: HttpService);
    create(booking: CreateBookingDTO): Promise<any>;
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
    delete(id: string): Promise<{
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
