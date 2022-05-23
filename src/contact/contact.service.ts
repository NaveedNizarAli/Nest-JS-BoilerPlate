import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContactDocument } from './contact.schema';
import { Model } from 'mongoose';


@Injectable()
export class ContactService {
    constructor(
        @InjectModel('Contact') private readonly contactModal: Model<ContactDocument>,
    ) {}

    async create(contact : Object) : Promise<ContactDocument> {
        
        let findOne = await this.contactModal.findOne({email : contact['email']});

        if(!findOne || findOne === null){
            const newContact = new this.contactModal(contact);
            return newContact.save();
        }
        else if(!findOne.createdBy.includes(contact['createdBy'])){
            return await this.contactModal.findByIdAndUpdate(findOne._id,{ $push: { "createdBy": contact['createdBy'] } }, {new: true})
        }
        else{
            return findOne
        }
        
    }

    async getall() : Promise<any> {
        let data = await this.contactModal.find({});
        
        let dataArray = [];
        for (const element of data) {
            console.log(element.delete);
            if(!element.delete) dataArray.push(element)
        }

        return dataArray;
    }

    async getById(id: string,) : Promise<ContactDocument> {
        return await this.contactModal.findById(id);
    }

    async getByCreatedBy(createdBy: string,) : Promise<any> {
        return await this.contactModal.find({
            createdBy: {
              $all:  [
                createdBy,
              ]
            }
        });
    }
}
