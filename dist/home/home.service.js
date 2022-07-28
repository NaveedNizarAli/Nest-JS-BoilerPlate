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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let HomeService = class HomeService {
    constructor(homeModel, bookingModel) {
        this.homeModel = homeModel;
        this.bookingModel = bookingModel;
    }
    async create(home) {
        console.log('booking', home);
        const newHome = new this.homeModel(Object.assign(Object.assign({}, home), { created: new Date().valueOf(), updated: new Date().valueOf() }));
        return newHome.save();
    }
    async getall() {
        let data = await this.homeModel.find({});
        let dataArray = [];
        for (const element of data) {
            console.log(element.delete);
            if (!element.delete)
                dataArray.push(element);
        }
        return dataArray;
    }
    async getByCreatedBy(createdBy) {
        return await this.homeModel.find({
            createdBy: createdBy
        });
    }
    async getBookingbyHomeID(homeId) {
        return await this.bookingModel.find({
            homeId: homeId
        });
    }
    async delete(id) {
        let home = await this.homeModel.findByIdAndDelete(id).exec();
        let data = await this.bookingModel.find({ homeId: id }).exec();
        for (const item of data) {
            await this.bookingModel.findByIdAndDelete(item._id).exec();
        }
        return home;
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Home')),
    __param(1, (0, mongoose_1.InjectModel)('Booking')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map