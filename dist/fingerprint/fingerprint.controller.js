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
exports.FingerprintController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const fingerprint_service_1 = require("./fingerprint.service");
const create_fingerprint_dto_1 = require("./dtos/create-fingerprint.dto");
const enterpassAppIds_1 = require("../enums/enterpassAppIds");
const rxjs_1 = require("rxjs");
const delete_lock_dto_1 = require("./dtos/delete-lock.dto");
let FingerprintController = class FingerprintController {
    constructor(fingerprintService, httpService) {
        this.fingerprintService = fingerprintService;
        this.httpService = httpService;
    }
    async create(fingerprint) {
        console.log('create');
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = fingerprint.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', fingerprint.lockId);
        params.append('startDate', fingerprint.startDate.toString());
        params.append('endDate', fingerprint.endDate.toString());
        params.append('fingerprintNumber', fingerprint.fingerprintNumber);
        params.append('fingerprintType', '1');
        params.append('fingerprintName', fingerprint.fingerprintName);
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/fingerprint/add', params, config)).then(response => {
            console.log('response', response.data);
            if (response) {
                if (response.data.fingerprintId)
                    return { success: true, error: '', message: 'fingerprint created succesfully', data: response.data.fingerprintId };
                else
                    return { success: false, error: 'unable to create fingerprint ', message: 'unable to create fingerprint', data: '' };
            }
        });
        if (data.success) {
            let fingerprintData = {
                createdBy: fingerprint.createdBy,
                startDate: fingerprint.startDate,
                endDate: fingerprint.endDate,
                lockId: fingerprint.lockId,
                fingerprintNumber: parseInt(fingerprint.fingerprintNumber),
                fingerprintName: fingerprint.fingerprintName,
                fingerprintType: 1,
                fingerprintId: data.data
            };
            return this.fingerprintService.create(fingerprintData).then((res) => {
                console.log('res', res);
                if (res._id) {
                    console.log('_id');
                    return {
                        success: true,
                        message: 'fingerprint successfully created',
                        error: '',
                        data: Object.assign(Object.assign({}, fingerprintData), { _id: res._id, created: new Date().valueOf(), updated: new Date().valueOf() })
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'unable to create fingerprint',
                        error: 'unable to create fingerprint',
                        data: ''
                    };
                }
            });
        }
        else {
            return data;
        }
    }
    async findAll(createdBy) {
        let data = await this.fingerprintService.getall(createdBy);
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
    async delete(fingerprint) {
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = fingerprint.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('fingerprintId', fingerprint.fingerprintId.toString());
        params.append('lockId', fingerprint.lockId);
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/fingerprint/delete', params, config)).then(response => {
            console.log('response', response);
            if (response) {
                if (response.data.errcode === 0)
                    return { success: true, error: '', message: 'fingerprint successfully deleted', data: response.data };
                else
                    return { success: false, error: 'unable to delete fingerprint ', message: 'unable to delete fingerprint', data: '' };
            }
        });
        if (data.success) {
            return this.fingerprintService.delete(fingerprint._id).then((res) => {
                console.log('res', res);
                if (res === null)
                    return { success: false, error: 'unable to delete fingerprint ', message: 'unable to delete fingerprint', data: '' };
                if (res && res._id)
                    return { success: true, message: 'fingerprint successfully deleted', error: '', data: res };
                else
                    return { success: false, error: 'unable to delete fingerprint ', message: 'unable to delete fingerprint', data: '' };
            });
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fingerprint_dto_1.CreateFingerPrintDTO]),
    __metadata("design:returntype", Promise)
], FingerprintController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getbylockid/:createdBy'),
    __param(0, (0, common_1.Param)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FingerprintController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_lock_dto_1.DeleteFingerPrintDTO]),
    __metadata("design:returntype", Promise)
], FingerprintController.prototype, "delete", null);
FingerprintController = __decorate([
    (0, common_1.Controller)('fingerprint'),
    __metadata("design:paramtypes", [fingerprint_service_1.FingerprintService, axios_1.HttpService])
], FingerprintController);
exports.FingerprintController = FingerprintController;
//# sourceMappingURL=fingerprint.controller.js.map