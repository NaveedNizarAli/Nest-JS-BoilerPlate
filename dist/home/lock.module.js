"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const booking_schema_1 = require("../booking/booking.schema");
const lock_controller_1 = require("./lock.controller");
const lock_schema_1 = require("./lock.schema");
const lock_service_1 = require("./lock.service");
let LockModule = class LockModule {
};
LockModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: 'Lock', schema: lock_schema_1.LockSchema }, { name: 'Booking', schema: booking_schema_1.BookingSchema }])],
        controllers: [lock_controller_1.LockController],
        providers: [lock_service_1.LockService],
        exports: [lock_service_1.LockService],
    })
], LockModule);
exports.LockModule = LockModule;
//# sourceMappingURL=lock.module.js.map