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
exports.LockController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const enterpassAppIds_1 = require("../enums/enterpassAppIds");
const delete_lock_dto_1 = require("./dtos/delete-lock.dto");
const get_records_dto_1 = require("./dtos/get-records.dto");
const new_lock_dto_1 = require("./dtos/new-lock.dto");
const lock_service_1 = require("./lock.service");
let LockController = class LockController {
    constructor(lockService, httpService) {
        this.lockService = lockService;
        this.httpService = httpService;
    }
    async create(lock) {
        console.log('lock', lock);
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = lock.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockData', lock.lockData);
        params.append('lockAlias', lock.lockName);
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log('params', params);
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/lock/initialize', params, config)).then(response => {
            if (response) {
                return this.lockService.getByLockId(response.data.lockId).then((lockResponse) => {
                    console.log('response', lockResponse);
                    if (lockResponse && lockResponse._id) {
                        return { success: false, error: 'lock already initialized ', message: 'lock already initialized', data: '' };
                    }
                    else {
                        return { success: true, error: 'unable to lock ', message: 'unable to find lock', lockId: response.data.lockId };
                    }
                });
            }
        });
        console.log('data', data);
        if (data.success) {
            let result = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://euapi.ttlock.com/v3/lock/detail?clientId=' + enterpassAppIds_1.EnterPassConfig.clientId + '&accessToken=' + access_token + '&lockId=' + data.lockId + '&date=' + new Date().valueOf())).then(response => {
                console.log('response', response);
                if (response && response.data.lockId) {
                    return this.lockService.create({ lockData: Object.assign({}, response.data), created: new Date().valueOf(), updated: new Date().valueOf(), createdBy: lock.createdBy, lockId: response.data.lockId, lockDataString: lock.lockData, homeId: lock.homeId }).then((res) => {
                        return { success: true, message: 'lock initialized successfully', error: '', data: res };
                    });
                }
            });
            console.log('result', result);
            return result;
        }
        else {
            return data;
        }
    }
    async getByLockId(lockId) {
        let data = await this.lockService.getByLockId(lockId);
        if (data) {
            return {
                success: true,
                message: 'locks successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find locks',
                error: 'unable to find locks',
            };
        }
    }
    async getCreatedBy(createdBy) {
        let data = await this.lockService.getByCreatedBy(createdBy);
        if (data.length > 0) {
            return {
                success: true,
                message: 'locks successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find locks',
                error: 'unable to find locks',
            };
        }
    }
    async findAll() {
        let data = await this.lockService.getall();
        if (data.length > 0) {
            return {
                success: true,
                message: 'locks successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find locks',
                error: 'unable to find locks',
            };
        }
    }
    async getRecords(lock) {
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = lock.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        if (lock.records)
            params.append('records', lock.records);
        params.append('lockId', lock.lockId);
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const recordType = {
            1: "unlock by app",
            4: "unlock by passcode",
            5: "Rise the lock (for parking lock)",
            6: "Lower the lock (for parking lock)",
            7: "unlock by IC card",
            8: "unlock by fingerprint",
            9: "unlock by wrist strap",
            10: "unlock by Mechanical key",
            11: "lock by app",
            12: "unlock by gateway",
            29: "apply some force on the Lock",
            30: "Door sensor closed",
            31: "Door sensor open",
            32: "open from inside",
            33: "lock by fingerprint",
            34: "lock by passcode",
            35: "lock by IC card",
            36: "lock by Mechanical key",
            37: "Remote Control",
            42: "received new local mail",
            43: "received new other cities' mail",
            44: "Tamper alert",
            45: "Auto Lock",
            46: "unlock by unlock key",
            47: "lock by lock key",
            48: "System locked ( Caused by, for example: Using INVALID Passcode/Fingerprint/Card several times)",
            49: "unlock by hotel card",
            50: "Unlocked due to the high temperature",
            52: "Dead lock with APP",
            53: "Dead lock with passcode",
            54: "The car left (for parking lock)",
            55: "unlock with key fob",
            57: "Unlock with QR code success",
            58: "Unlock with QR code failed, it's expired",
            59: "Double locked",
            60: "Cancel double lock",
            61: "Lock with QR code success",
            62: "Lock with QR code failed, the lock is double locked",
            63: "Auto unlock at passage mode"
        };
        let data;
        if (lock.records) {
            data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/lockRecord/upload', params, config)).then((response) => {
                console.log('response', response);
                if (response.data && response.data.errcode === 0) {
                    return {
                        success: true,
                        message: 'data uploaded successfully',
                        error: 'data uploaded successfully',
                    };
                }
            });
        }
        if ((data && data.success) || !lock.records) {
            return await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://euapi.ttlock.com/v3/lockRecord/list?clientId=' + enterpassAppIds_1.EnterPassConfig.clientId + '&accessToken=' + access_token + '&lockId=' + lock.lockId + '&date=' + new Date().valueOf() + '&pageNo=1&pageSize=100')).then(response => {
                if (response.data && response.data.list) {
                    let index = 0;
                    for (const item of response.data.list) {
                        if (item.recordType)
                            response.data.list[index].recordTypeString = recordType[response.data.list[index].recordType] || '';
                        response.data.list[index].objectId = response.data.list[index].lockDate.toString() + response.data.list[index].lockId.toString();
                        index = index + 1;
                    }
                    return {
                        success: true,
                        message: 'data found successfully',
                        error: 'data found successfully',
                        data: response.data
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'unable to upload data',
                        error: 'unable to upload data',
                    };
                }
            });
        }
    }
    async delete(lock) {
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = lock.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', lock.lockId);
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/lock/delete', params, config)).then(response => {
            console.log('res', response);
            if (response) {
                if (response.data.errcode === 0)
                    return { success: true, error: '', message: 'lock deleted', data: lock.lockId };
                else
                    return { success: false, error: 'unable to delete lock ', message: 'unable to delete lock', data: '' };
            }
        });
        if (data.success) {
            return this.lockService.delete(lock._id).then((res) => {
                console.log('res', res);
                if (res === null)
                    return { success: false, error: 'unable to delete lock ', message: 'unable to delete lock', data: '' };
                if (res && res._id)
                    return { success: true, message: 'lock successfully deleted', error: '', data: res };
                else
                    return { success: false, error: 'unable to delete lock ', message: 'unable to delete lock', data: '' };
            });
        }
        else {
            return data;
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_lock_dto_1.NewLockDTO]),
    __metadata("design:returntype", Promise)
], LockController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getByLockId/:lockId'),
    __param(0, (0, common_1.Param)('lockId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LockController.prototype, "getByLockId", null);
__decorate([
    (0, common_1.Get)('/createdBy/:createdBy'),
    __param(0, (0, common_1.Param)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LockController.prototype, "getCreatedBy", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('getlockRecords'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_records_dto_1.GetRecordsDTO]),
    __metadata("design:returntype", Promise)
], LockController.prototype, "getRecords", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_lock_dto_1.DeleteLockDTO]),
    __metadata("design:returntype", Promise)
], LockController.prototype, "delete", null);
LockController = __decorate([
    (0, common_1.Controller)('lock'),
    __metadata("design:paramtypes", [lock_service_1.LockService, axios_1.HttpService])
], LockController);
exports.LockController = LockController;
//# sourceMappingURL=lock.controller.js.map