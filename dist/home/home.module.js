"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const booking_schema_1 = require("../booking/booking.schema");
const home_controller_1 = require("./home.controller");
const home_schema_1 = require("./home.schema");
const home_service_1 = require("./home.service");
let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, mongoose_1.MongooseModule.forFeature([{ name: 'Home', schema: home_schema_1.HomeSchema }, { name: 'Booking', schema: booking_schema_1.BookingSchema }])],
        controllers: [home_controller_1.HomeController],
        providers: [home_service_1.HomeService],
        exports: [home_service_1.HomeService],
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map