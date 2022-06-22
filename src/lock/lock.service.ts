import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LockDocument } from './lock.schema';

@Injectable()
export class LockService {
    constructor(
        @InjectModel('Lock') private readonly lockModel: Model<LockDocument>,
    ) {}


    async create(lock : object)  : Promise<any> {
        console.log('lock', lock);
        const newLock = new this.lockModel({
            ...lock
        });
        return newLock.save();
    }

    async getByLockId(id: string,) : Promise<LockDocument | null> {
        return await this.lockModel.findOne({lockId : id}).exec();
    }

    async getByCreatedBy(createdBy: string,) : Promise<any> {
        return await this.lockModel.find({
            createdBy: createdBy
        });
    }

    async getall() : Promise<any> {
        let data = await this.lockModel.find({});
        
        let dataArray = [];
        for (const element of data) {
            console.log(element.delete);
            if(!element.delete) dataArray.push(element)
        }

        return dataArray;
    }
}
