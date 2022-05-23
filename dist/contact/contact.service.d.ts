import { ContactDocument } from './contact.schema';
import { Model } from 'mongoose';
export declare class ContactService {
    private readonly contactModal;
    constructor(contactModal: Model<ContactDocument>);
    create(contact: Object): Promise<ContactDocument>;
    getall(): Promise<any>;
    getById(id: string): Promise<ContactDocument>;
    getByCreatedBy(createdBy: string): Promise<any>;
}
