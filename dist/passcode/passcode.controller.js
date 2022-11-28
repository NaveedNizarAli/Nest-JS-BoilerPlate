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
exports.PasscodeController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const enterpassAppIds_1 = require("../enums/enterpassAppIds");
const passcode_service_1 = require("./passcode.service");
const create_passcode_dto_1 = require("./dtos/create-passcode.dto");
const create_custompasscode_dto_1 = require("./dtos/create-custompasscode.dto");
let PasscodeController = class PasscodeController {
    constructor(PasscodeService, httpService) {
        this.PasscodeService = PasscodeService;
        this.httpService = httpService;
    }
    async create(passcode) {
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        console.log('passcode', passcode);
        let access_token = passcode.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', passcode.lockId);
        params.append('startDate', passcode.startDate.toString());
        if (passcode.endDate)
            params.append('endDate', passcode.endDate.toString());
        params.append('keyboardPwdName', passcode.keyboardPwdName);
        params.append('keyboardPwdType', passcode.keyboardPwdType.toString());
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/keyboardPwd/get', params, config)).then(response => {
            console.log('response', response.data);
            if (response) {
                if (response.data.keyboardPwdId)
                    return { success: true, error: '', message: 'passcode created succesfully', data: response.data };
                else
                    return { success: false, error: 'unable to create passcode ', message: 'unable to create passcode', data: '' };
            }
        });
        if (data.success) {
            let passcodeData = {
                createdBy: passcode.createdBy,
                startDate: passcode.startDate,
                endDate: passcode.endDate,
                lockId: passcode.lockId,
                keyboardPwdType: passcode.keyboardPwdType,
                keyboardPwdName: passcode.keyboardPwdName,
                keyboardPwd: data.data.keyboardPwd,
                keyboardPwdId: data.data.keyboardPwdId
            };
            return this.PasscodeService.create(passcodeData).then((res) => {
                console.log('res', res);
                if (res._id) {
                    return {
                        success: true,
                        message: 'passcode successfully created',
                        error: '',
                        data: Object.assign(Object.assign({}, passcodeData), { _id: res._id, created: new Date().valueOf(), updated: new Date().valueOf() })
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'unable to create passcode',
                        error: 'unable to create passcode',
                        data: ''
                    };
                }
            });
        }
        else {
            return data;
        }
    }
    async createrandom(passcode) {
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        let access_token = passcode.accessToken.split(' ')[1];
        params.append('accessToken', access_token);
        params.append('lockId', passcode.lockId);
        params.append('startDate', passcode.startDate.toString());
        params.append('endDate', passcode.endDate.toString());
        params.append('keyboardPwdName', passcode.keyboardPwdName);
        params.append('keyboardPwd', passcode.keyboardPwd.toString());
        params.append('date', new Date().valueOf().toString());
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/keyboardPwd/add', params, config)).then(response => {
            console.log('response', response.data);
            if (response) {
                if (response.data.keyboardPwdId)
                    return { success: true, error: '', message: 'custom passcode created succesfully', data: response.data };
                else
                    return { success: false, error: 'unable to create custom passcode ', message: 'unable to create custom passcode', data: '' };
            }
        });
        if (data.success) {
            let passcodeData = {
                createdBy: passcode.createdBy,
                startDate: passcode.startDate,
                endDate: passcode.endDate,
                lockId: passcode.lockId,
                keyboardPwdName: passcode.keyboardPwdName,
                keyboardPwd: passcode.keyboardPwd,
                keyboardPwdId: data.data.keyboardPwdId
            };
            return this.PasscodeService.create(passcodeData).then((res) => {
                console.log('res', res);
                if (res._id) {
                    return {
                        success: true,
                        message: 'custom passcode successfully created',
                        error: '',
                        data: Object.assign(Object.assign({}, passcodeData), { _id: res._id, created: new Date().valueOf(), updated: new Date().valueOf() })
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'unable to create custom passcode',
                        error: 'unable to create custom passcode',
                        data: ''
                    };
                }
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
    __metadata("design:paramtypes", [create_passcode_dto_1.CreatePassCodeDTO]),
    __metadata("design:returntype", Promise)
], PasscodeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('createcustom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_custompasscode_dto_1.CreateCustomPassCodeDTO]),
    __metadata("design:returntype", Promise)
], PasscodeController.prototype, "createrandom", null);
PasscodeController = __decorate([
    (0, common_1.Controller)('passcode'),
    __metadata("design:paramtypes", [passcode_service_1.PasscodeService, axios_1.HttpService])
], PasscodeController);
exports.PasscodeController = PasscodeController;
//# sourceMappingURL=passcode.controller.js.map