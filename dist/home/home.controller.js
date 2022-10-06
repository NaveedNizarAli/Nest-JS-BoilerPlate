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
exports.HomeController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const delete_home_dto_1 = require("./dtos/delete-home.dto");
const new_home_dto_1 = require("./dtos/new-home.dto");
const home_service_1 = require("./home.service");
let HomeController = class HomeController {
    constructor(homeService, httpService) {
        this.homeService = homeService;
        this.httpService = httpService;
    }
    async create(home) {
        let data = await this.homeService.create(home);
        if (data._id) {
            return {
                success: true,
                message: 'home successfully created',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'home unable to create',
                error: 'home unable to create',
            };
        }
    }
    async findAll() {
        let data = await this.homeService.getall();
        if (data.length > 0) {
            return {
                success: true,
                message: 'home successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find home',
                error: 'unable to find home',
            };
        }
    }
    async getCreatedBy(createdBy) {
        let data = await this.homeService.getByCreatedBy(createdBy);
        if (data.length > 0) {
            return {
                success: true,
                message: 'home successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find home',
                error: 'unable to find home',
            };
        }
    }
    async delete(id, home) {
        return this.homeService.delete(id).then((res) => {
            if (res === null)
                return { success: false, error: 'unable to delete home ', message: 'unable to delete home', data: '' };
            if (res && res._id)
                return { success: true, message: 'home successfully deleted', error: '', data: res };
            else
                return { success: false, error: 'unable to delete home ', message: 'unable to delete home', data: '' };
        });
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_home_dto_1.NewHomeDTO]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/createdBy/:createdBy'),
    __param(0, (0, common_1.Param)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getCreatedBy", null);
__decorate([
    (0, common_1.Put)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, delete_home_dto_1.DeleteHomeDTO]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "delete", null);
HomeController = __decorate([
    (0, common_1.Controller)('home'),
    __metadata("design:paramtypes", [home_service_1.HomeService, axios_1.HttpService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map