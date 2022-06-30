import { HomeDocument } from "./home.schema";
import { Model } from 'mongoose';
export declare class HomeService {
    private readonly homeModel;
    constructor(homeModel: Model<HomeDocument>);
    create(home: Object): Promise<HomeDocument>;
    getall(): Promise<any>;
    getByCreatedBy(createdBy: string): Promise<any>;
}
