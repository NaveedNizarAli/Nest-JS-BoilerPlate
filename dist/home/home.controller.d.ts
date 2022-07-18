import { HttpService } from "@nestjs/axios";
import { NewHomeDTO } from "./dtos/new-home.dto";
import { HomeService } from "./home.service";
export declare class HomeController {
    private homeService;
    private readonly httpService;
    constructor(homeService: HomeService, httpService: HttpService);
    create(home: NewHomeDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./home.schema").HomeDocument;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    getCreatedBy(createdBy: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
}
