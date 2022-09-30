"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fingerprint_controller_1 = require("./fingerprint.controller");
const fingerprint_schema_1 = require("./fingerprint.schema");
const fingerprint_service_1 = require("./fingerprint.service");
let BookingModule = class BookingModule {
};
BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: 'Fingerprint', schema: fingerprint_schema_1.BookingSchema }])],
        controllers: [fingerprint_controller_1.FingerprintController],
        providers: [fingerprint_service_1.FingerprintService],
        exports: [fingerprint_service_1.FingerprintService],
    })
], BookingModule);
exports.BookingModule = BookingModule;
//# sourceMappingURL=fingerprint.module.js.map