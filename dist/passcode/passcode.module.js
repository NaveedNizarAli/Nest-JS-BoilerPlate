"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasscodeModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lock_schema_1 = require("../lock/lock.schema");
const passcode_controller_1 = require("./passcode.controller");
const passcode_schema_1 = require("./passcode.schema");
const passcode_service_1 = require("./passcode.service");
let PasscodeModule = class PasscodeModule {
};
PasscodeModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: 'Passcode', schema: passcode_schema_1.BookingSchema }, { name: 'Lock', schema: lock_schema_1.LockSchema }])],
        controllers: [passcode_controller_1.PasscodeController],
        providers: [passcode_service_1.PasscodeService],
        exports: [passcode_service_1.PasscodeService],
    })
], PasscodeModule);
exports.PasscodeModule = PasscodeModule;
//# sourceMappingURL=passcode.module.js.map