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
exports.BookingController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const enterpassAppIds_1 = require("../enums/enterpassAppIds");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dtos/create-booking.dto");
let BookingController = class BookingController {
    constructor(bookingService, httpService) {
        this.bookingService = bookingService;
        this.httpService = httpService;
    }
    async create(booking) {
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = booking.accessToken.split(' ')[1];
        let locks = await this.bookingService.getLocks(booking.homeId);
        if (locks.length > 0) {
            let index = 0;
            let pwd;
            let successArray = [];
            for (const item of locks) {
                if (item._id) {
                    params.append('accessToken', access_token);
                    params.append('lockId', item.lockId);
                    params.append('startDate', booking.startDate.toString());
                    params.append('endDate', booking.endDate.toString());
                    params.append('keyboardPwdName', booking.contactName);
                    params.append('keyboardPwdType', '3');
                    params.append('date', new Date().valueOf().toString());
                    delete booking.accessToken;
                    const config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };
                    let url;
                    if (index === 0) {
                        url = 'https://api.ttlock.com/v3/keyboardPwd/get';
                        console.log('params', index, params);
                    }
                    else {
                        url = 'https://api.ttlock.com/v3/keyboardPwd/add';
                        params.append('keyboardPwd', pwd.toString());
                        params.delete('keyboardPwdType');
                        console.log('params', index, params);
                    }
                    let enterpassreult = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, params, config)).then(response => {
                        console.log('response', response.data);
                        if (index === 0) {
                            pwd = response.data.keyboardPwd;
                        }
                        if (response.data && response.data.keyboardPwdId) {
                            return { success: true, message: 'booking successfully created', data: response.data };
                        }
                        return {
                            success: false,
                            message: 'booking unable to create',
                            error: 'booking unable to create',
                            data: ''
                        };
                    });
                    if (enterpassreult.success) {
                        successArray.push({
                            keyboardPwdId: enterpassreult.data.keyboardPwdId,
                            keyboardPwd: index === 0 ? enterpassreult.data.keyboardPwd : pwd,
                            lockId: item.lockId,
                            lockIdObject: item._id
                        });
                    }
                    index = index + 1;
                }
            }
            booking['lockIds'] = successArray;
            let data = await this.bookingService.create(booking);
            if (data._id && index === (successArray.length)) {
                return {
                    success: true,
                    message: 'booking successfully created',
                    error: 'booking successfully created',
                    data: Object.assign({}, data)
                };
            }
            else {
                return {
                    success: false,
                    message: 'booking unable to create',
                    error: 'booking unable to create',
                    data: ''
                };
            }
        }
    }
    async findAll() {
        let data = await this.bookingService.getall();
        if (data.length > 0) {
            return {
                success: true,
                message: 'bookings successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find bookings',
                error: 'unable to find bookings',
            };
        }
    }
    async getCreatedBy(createdBy) {
        let data = await this.bookingService.getByCreatedBy(createdBy);
        if (data.length > 0) {
            return {
                success: true,
                message: 'bookings successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find bookings',
                error: 'unable to find bookings',
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDTO]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/createdBy/:createdBy'),
    __param(0, (0, common_1.Param)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getCreatedBy", null);
BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService, axios_1.HttpService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map