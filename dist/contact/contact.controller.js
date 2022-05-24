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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const create_contact_dto_1 = require("./dtos/create-contact.dto");
const update_contact_dto_1 = require("./dtos/update-contact.dto");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async create(contact) {
        let data = await this.contactService.create(contact);
        if (data._id) {
            return {
                success: true,
                message: 'contact successfully created',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'contact unable to create',
                error: 'contact unable to create',
            };
        }
    }
    async findAll() {
        let data = await this.contactService.getall();
        if (data.length > 0) {
            return {
                success: true,
                message: 'contact successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find contact',
                error: 'unable to find contact',
            };
        }
    }
    async getById(id) {
        let data = await this.contactService.getById(id);
        if (data._id) {
            return {
                success: true,
                message: 'contact successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find contact',
                error: 'unable to find contact',
            };
        }
    }
    async getCreatedBy(createdBy) {
        let data = await this.contactService.getByCreatedBy(createdBy);
        if (data.length > 0) {
            return {
                success: true,
                message: 'contact successfully found',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'unable to find contact',
                error: 'unable to find contact',
            };
        }
    }
    async update(id, user) {
        let data = await this.contactService.update(id, user);
        if (data._id) {
            return {
                success: true,
                message: 'contact successfully update',
                data: data
            };
        }
        else {
            return {
                success: false,
                message: 'contact unable to update',
                error: 'contact unable to update',
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDTO]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/createdBy/:createdBy'),
    __param(0, (0, common_1.Param)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getCreatedBy", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_dto_1.UpdateContactDTO]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "update", null);
ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map