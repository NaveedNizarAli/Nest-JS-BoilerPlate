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

    async getall() : Promise<any> {
        let data = await this.bookingModel.find({});
        
        let dataArray = [];
        for (const element of data) {
            console.log(element.delete);
            if(!element.delete) dataArray.push(element)
        }

        return dataArray;
    }

    async getByCreatedBy(createdBy: string,) : Promise<any> {
        return await this.bookingModel.find({
            createdBy: createdBy
        });
    }
}
