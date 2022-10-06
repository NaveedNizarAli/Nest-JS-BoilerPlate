import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { BookingDocument } from 'src/booking/booking.schema';
import { ContactDocument } from 'src/contact/contact.schema';
import { UpdateUserEnterPass } from './dtos/update-user.dto';
import { UserDetails } from './user-details.interface';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel       : Model<UserDocument>,
    @InjectModel('Booking') private readonly bookingModel : Model<BookingDocument>,
    @InjectModel('Contact') private readonly contactModal : Model<ContactDocument>,
  ) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    // return this._getUserDetails(user);
  }

  async find(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async create(
    usernameHash : string,
    username     : string,
    ttLockHash   : string,
    password     : string,
    date         : string,
    fullName     : string,
    )            : Promise<UserDocument> {
    const newUser = new this.userModel({
      usernameHash,
      username,
      ttLockHash,
      date,
      password,
      fullName,
      userType : [0],
      created: new Date().valueOf(), updated : new Date().valueOf()
    });
    return newUser.save();
  }

  async update(id: string, user: Object): Promise<UserDocument> {
      return await this.userModel.findByIdAndUpdate(id, user, {new: true})
  }

  async delete(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, {delete: true}, {new: true})
  }

  async deleteBooking(id: string): Promise<any> {
   
    const user = await this.userModel.findById(id).exec();
    
    let data = await this.bookingModel.find({createdBy: id}).exec();
    for (const item of data) {
       await this.bookingModel.findByIdAndDelete(item._id).exec();
    }

    return user;
  }

  async deleteContact(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    
    let data = await this.contactModal.find({
      createdBy: {
        $all:  [
          id,
        ]
      }
    }).exec();
    
    for (const item of data) {
      const index = item.createdBy.indexOf(id);
      if (index > -1) { 
        item.createdBy.splice(index, 1);
      }
      await this.contactModal.findByIdAndUpdate(item._id, {createdBy: item.createdBy}, {new: true}).exec();
    }

    return user;
  }
}
