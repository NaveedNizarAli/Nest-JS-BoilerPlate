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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const new_enterpass_user_dto_1 = require("./dtos/new-enterpass-user.dto");
const crypto = require("crypto");
const enterpassAppIds_1 = require("../enums/enterpassAppIds");
const existing_user_dto_1 = require("./dtos/existing-user.dto");
const refresh_token_dto_1 = require("./dtos/refresh_token.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
let UserController = class UserController {
    constructor(userService, httpService) {
        this.userService = userService;
        this.httpService = httpService;
    }
    register(user) {
        let userData = Object.assign({}, user);
        var usernameHash = crypto.createHash('md5').update(userData.username).digest('hex');
        var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');
        userData = Object.assign(Object.assign({}, userData), { username: usernameHash, password: passwordHash });
        function reverseString(str) {
            var splitString = str.split("");
            var reverseArray = splitString.reverse();
            var joinArray = reverseArray.join("");
            return joinArray;
        }
        const params = new URLSearchParams();
        params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
        params.append('clientSecret', enterpassAppIds_1.EnterPassConfig.clientSecret);
        params.append('date', user.date);
        params.append('username', reverseString(usernameHash));
        params.append('password', passwordHash);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log('params', params);
        let data = this.httpService.post('https://api.ttlock.com/v3/user/register', params, config).pipe((0, rxjs_1.map)(response => {
            console.log('response signup', response.data);
            if (response) {
                if (!response.data.errcode) {
                    return this.userService.findByUsername(user.username).then((userResponse) => {
                        if (userResponse && userResponse._id) {
                            let user = { password: userData.password, date: userData.date, fullName: userData.fullName };
                            this.userService.update(userResponse._id, user);
                            return {
                                success: true,
                                message: 'user successfully signed up',
                                data: response.data
                            };
                        }
                        else {
                            this.userService.create(usernameHash, user.username, response.data.username, userData.password, userData.date, user.fullName);
                            return {
                                success: true,
                                message: 'user successfully signed up',
                                data: response.data
                            };
                        }
                    });
                }
                else {
                    return Object.assign({ success: false, error: response.data.errmsg }, response.data);
                }
            }
        }));
        return data;
    }
    login(user) {
        let userData = Object.assign({}, user);
        var usernameHashed = crypto.createHash('md5').update(userData.username).digest('hex');
        var passwordHash = crypto.createHash('md5').update(userData.password).digest('hex');
        userData = Object.assign(Object.assign({}, userData), { username: usernameHashed, password: passwordHash });
        const params = new URLSearchParams();
        params.append('client_id', enterpassAppIds_1.EnterPassConfig.clientId);
        params.append('client_secret', enterpassAppIds_1.EnterPassConfig.clientSecret);
        params.append('password', passwordHash);
        return this.userService.findByUsername(user.username).then((res) => {
            console.log('res', res);
            if (res && res._id) {
                params.append('username', res.ttLockHash);
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                return this.httpService.post('https://api.ttlock.com/oauth2/token', params, config).pipe((0, rxjs_1.map)(response => {
                    if (!response.data.errcode) {
                        if (response.data.access_token) {
                            console.log('response', response.data);
                            let user = { uid: response.data.uid,
                                openid: response.data.openid,
                                scope: response.data.scope,
                                refresh_token: response.data.refresh_token,
                                access_token: response.data.token_type + ' ' + response.data.access_token,
                            };
                            return this.userService.update(res._id, user).then((res) => {
                                return {
                                    success: true,
                                    message: 'user successfully logged in',
                                    data: res
                                };
                            });
                        }
                    }
                    else {
                        return { success: false, error: response.data.errmsg, message: response.data.errmsg };
                    }
                }));
            }
            else {
                return { success: false, error: 'unable to logged in', message: 'unable to logged in' };
            }
        }).catch((err) => {
            return err;
        });
    }
    RevokeToken(data) {
        const params = new URLSearchParams();
        params.append('client_id', enterpassAppIds_1.EnterPassConfig.clientId);
        params.append('client_secret', enterpassAppIds_1.EnterPassConfig.clientSecret);
        params.append('refresh_token', data.refresh_token);
        params.append('grant_type', 'refresh_token');
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return this.httpService.post('https://api.ttlock.com/oauth2/token', params, config).pipe((0, rxjs_1.map)(response => {
            if (response) {
                if (response.data.access_token) {
                    let user = {
                        refresh_token: response.data.refresh_token,
                        access_token: response.data.token_type + ' ' + response.data.access_token,
                    };
                    let id = data._id;
                    return this.userService.update(id, user).then((res) => {
                        return {
                            success: true,
                            message: 'user token successfully revoked',
                            data: res
                        };
                    });
                }
                else {
                    return Object.assign({ success: false, error: response.data.errmsg }, response.data);
                }
            }
        }));
    }
    async update(id, user) {
        let data = await this.userService.update(id, user);
        if (data._id) {
            return {
                success: true,
                message: 'user successfully update',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'user unable to update',
                error: 'user unable to update',
            };
        }
    }
    async delete(id, user) {
        let deleteBooking = await this.userService.deleteBooking(id);
        let deleteContact = await this.userService.deleteContact(id);
        let deleteHome = await this.userService.deleteHome(id);
        let deleteLock = await this.userService.deleteLock(id);
        console.log('deleteLock', deleteLock);
        let data = await this.userService.delete(id);
        if (data._id) {
            const params = new URLSearchParams();
            params.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
            params.append('clientSecret', enterpassAppIds_1.EnterPassConfig.clientSecret);
            params.append('username', data.ttLockHash);
            params.append('date', new Date().valueOf().toString());
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            if (deleteLock && deleteLock.length > 0) {
                deleteLock.map(async (element, idx) => {
                    const params2 = new URLSearchParams();
                    params2.append('clientId', enterpassAppIds_1.EnterPassConfig.clientId);
                    params2.append('accessToken', user.accessToken);
                    params2.append('lockId', element.lockId);
                    params2.append('date', new Date().valueOf().toString());
                    let deleteLockApi = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/lock/delete', params2, config)).then(response => {
                        console.log('response1', response);
                    });
                });
            }
            let deleteUser = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://euapi.ttlock.com/v3/user/delete', params, config)).then(response => {
                console.log('response2', response);
                return {
                    success: true,
                    message: 'user successfully delete',
                    data: data
                };
            });
            return deleteUser;
        }
        else {
            return {
                success: false,
                message: 'user unable to delete',
                error: 'user unable to delete',
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_enterpass_user_dto_1.NewEnterPassUserDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [existing_user_dto_1.ExistingUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refreshToken'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "RevokeToken", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserEnterPass]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserEnterPass]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, axios_1.HttpService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map