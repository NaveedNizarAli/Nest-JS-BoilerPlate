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

    async getById(id: string,) : Promise<LockDocument | null> {
        return await this.lockModel.findOne({lockId : id}).exec();
    }
}
