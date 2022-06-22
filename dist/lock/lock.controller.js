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
const new_lock_dto_1 = require("./dtos/new-lock.dto");
const lock_service_1 = require("./lock.service");
let LockController = class LockController {
    constructor(lockService, httpService) {
        this.lockService = lockService;
        this.httpService = httpService;
    }
    async create(lock) {
        let lockData = Object.assign({}, lock);
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        params.append('accessToken', lock.accessToken);
        params.append('lockData', lock.lockData);
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api.ttlock.com/v3/lock/initialize', params, config)).then(response => {
            if (response) {
                return this.lockService.getById(response.data.lockId).then((lockResponse) => {
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
            let result = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.ttlock.com/v3/lock/detail?clientId=' + enterpassAppIds_1.EnterPassConfig.clientId + '&accessToken=' + lock.accessToken + '&lockId=' + data.lockId + '&date=' + new Date().valueOf())).then(response => {
                if (response && response.data.lockId) {
                    return this.lockService.create({ lockData: Object.assign({}, response.data), createdBy: lock.createdBy, lockId: response.data.lockId }).then((res) => {
                        return { sucess: true, message: 'lock initialized successfully', error: '', data: res };
                    });
                }
            });
            return result;
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
LockController = __decorate([
    (0, common_1.Controller)('lock'),
    __metadata("design:paramtypes", [lock_service_1.LockService, axios_1.HttpService])
], LockController);
exports.LockController = LockController;
//# sourceMappingURL=lock.controller.js.map