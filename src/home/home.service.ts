import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HomeDocument } from "./home.schema";
import { Model } from 'mongoose';
import { BookingDocument } from "src/booking/booking.schema";

@Injectable()
export class HomeService {
    constructor(
        @InjectModel('Home') private readonly homeModel: Model<HomeDocument>,
        @InjectModel('Booking') private readonly bookingModel: Model<BookingDocument>,
    ) {}


    async create(home : Object) : Promise<HomeDocument> {
        console.log('booking', home);
        const newHome = new this.homeModel({...home, created: new Date().valueOf(), updated : new Date().valueOf()});
        return newHome.save();   
    }

    async getall() : Promise<any> {
        let data = await this.homeModel.find({});
        
        let dataArray = [];
        for (const element of data) {
            console.log(element.delete);
            if(!element.delete) dataArray.push(element)
        }

        return dataArray;
    }

    async getByCreatedBy(createdBy: string) : Promise<any> {
        return await this.homeModel.find({
            createdBy: createdBy
        });
    }

    async getBookingbyHomeID(homeId : string) : Promise<any> {
        return await this.bookingModel.find({
            homeId: homeId
        });
    }

    async delete(id: string): Promise<any> {
        let home = await this.homeModel.findByIdAndDelete(id).exec();
        
        let data = await this.bookingModel.find({homeId: id}).exec();
        for (const item of data) {
            await this.bookingModel.findByIdAndDelete(item._id).exec();
        }

        return home;
    }

}