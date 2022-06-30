import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HomeDocument } from "./home.schema";
import { Model } from 'mongoose';

@Injectable()
export class HomeService {
    constructor(
        @InjectModel('Home') private readonly homeModel: Model<HomeDocument>,
    ) {}


    async create(home : Object) : Promise<HomeDocument> {
        console.log('booking', home);
        const newHome = new this.homeModel(home);
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

}