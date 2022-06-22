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
const new_lock_dto_1 = require("./dtos/new-lock.dto");
const lock_service_1 = require("./lock.service");
let LockController = class LockController {
    constructor(lockService, httpService) {
        this.lockService = lockService;
        this.httpService = httpService;
    }
    async create(lock) {
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
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api.ttlock.com/v3/lock/initialize', params, config)).then(response => {
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
        if (data.success) {
            let result = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.ttlock.com/v3/lock/detail?clientId=' + enterpassAppIds_1.EnterPassConfig.clientId + '&accessToken=' + access_token + '&lockId=' + data.lockId + '&date=' + new Date().valueOf())).then(response => {
                console.log('response', response);
                if (response && response.data.lockId) {
                    return this.lockService.create({ lockData: Object.assign({}, response.data), createdBy: lock.createdBy, lockId: response.data.lockId }).then((res) => {
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
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api.ttlock.com/v3/lock/delete', params, config)).then(response => {
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