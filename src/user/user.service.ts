import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UpdateUserEnterPass } from './dtos/update-user.dto';
import { UserDetails } from './user-details.interface';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id       : user._id,
      username : user.username,
      date     : user.date,
    };
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async find(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async create(
    usernameHash : string,
    username     : string,
    password     : string,
    date         : string,
    )            : Promise<UserDocument> {
    const newUser = new this.userModel({
      usernameHash,
      username,
      date,
      password,
    });
    return newUser.save();
  }

  async update(id: string, user: Object): Promise<UserDocument> {
      return await this.userModel.findByIdAndUpdate(id, user, {new: true})
  }
}
