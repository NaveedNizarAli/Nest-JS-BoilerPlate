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
exports.LockService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let LockService = class LockService {
    constructor(lockModel, bookingModel) {
        this.lockModel = lockModel;
        this.bookingModel = bookingModel;
    }
    async create(lock) {
        console.log('lock', lock);
        const newLock = new this.lockModel(Object.assign({}, lock));
        return newLock.save();
    }
    async getByLockId(id) {
        return await this.lockModel.findOne({ lockId: id, delete: false }).exec();
    }
    async getByCreatedBy(createdBy) {
        return await this.lockModel.find({
            createdBy: createdBy
        });
    }
    async getall() {
        let data = await this.lockModel.find({});
        let dataArray = [];
        for (const element of data) {
            console.log(element.delete);
            if (!element.delete)
                dataArray.push(element);
        }
        return dataArray;
    }
    async update(id, lock) {
        return await this.lockModel.findByIdAndUpdate(id, lock, { new: true });
    }
    async delete(id) {
        let lock = await this.lockModel.findByIdAndDelete(id).exec();
        return lock;
    }
};
LockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Lock')),
    __param(1, (0, mongoose_1.InjectModel)('Booking')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LockService);
exports.LockService = LockService;
//# sourceMappingURL=lock.service.js.map