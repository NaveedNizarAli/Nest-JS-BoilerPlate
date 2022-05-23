import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDocument } from './booking.schema';
import { Model } from 'mongoose';


@Injectable()
export class BookingService {
    constructor(
        @InjectModel('Booking') private readonly bookingModel: Model<BookingDocument>,
    ) {}

    async create(booking : Object) : Promise<BookingDocument> {
            console.log('booking', booking);
            const newBooking = new this.bookingModel(booking);
            return newBooking.save();
        
    }
}
