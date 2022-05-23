import { ContactService } from './contact.service';
import { CreateContactDTO } from './dtos/create-contact.dto';
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    create(contact: CreateContactDTO): Promise<{
        success: boolean;
        message: string;
        data: import("./contact.schema").ContactDocument;
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
    getById(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./contact.schema").ContactDocument;
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
