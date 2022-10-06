"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel, bookingModel, contactModal, homeModel, lockModel) {
        this.userModel = userModel;
        this.bookingModel = bookingModel;
        this.contactModal = contactModal;
        this.homeModel = homeModel;
        this.lockModel = lockModel;
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username: username, delete: false }).exec();
    }
    async findByUsernameSignup(username) {
        return this.userModel.findOne({ username: username, delete: true }).exec();
    }
    async findById(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user)
            return null;
    }
    async find() {
        return this.userModel.find({}).exec();
    }
    async create(usernameHash, username, ttLockHash, password, date, fullName) {
        const newUser = new this.userModel({
            usernameHash,
            username,
            ttLockHash,
            date,
            password,
            fullName,
            userType: [0],
            created: new Date().valueOf(), updated: new Date().valueOf()
        });
        return newUser.save();
    }
    async update(id, user) {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }
    async delete(id) {
        return await this.userModel.findByIdAndUpdate(id, { delete: true }, { new: true });
    }
    async deleteBooking(id) {
        const user = await this.userModel.findById(id).exec();
        let data = await this.bookingModel.find({ createdBy: id }).exec();
        for (const item of data) {
            await this.bookingModel.findByIdAndDelete(item._id).exec();
        }
        return user;
    }
    async deleteContact(id) {
        const user = await this.userModel.findById(id).exec();
        let data = await this.contactModal.find({
            createdBy: {
                $all: [
                    id,
                ]
            }
        }).exec();
        for (const item of data) {
            const index = item.createdBy.indexOf(id);
            if (index > -1) {
                item.createdBy.splice(index, 1);
            }
            await this.contactModal.findByIdAndUpdate(item._id, { createdBy: item.createdBy }, { new: true }).exec();
        }
        return user;
    }
    async deleteHome(id) {
        const user = await this.userModel.findById(id).exec();
        let data = await this.homeModel.find({ createdBy: id }).exec();
        for (const item of data) {
            await this.homeModel.findByIdAndDelete(item._id).exec();
        }
        return user;
    }
    async deleteLock(id) {
        let data = await this.lockModel.find({ createdBy: id }).exec();
        for (const item of data) {
            await this.lockModel.findByIdAndDelete(item._id).exec();
        }
        return data;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Booking')),
    __param(2, (0, mongoose_1.InjectModel)('Contact')),
    __param(3, (0, mongoose_1.InjectModel)('Home')),
    __param(4, (0, mongoose_1.InjectModel)('Lock')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map