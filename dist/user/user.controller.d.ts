import { UserService } from './user.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { NewEnterPassUserDTO } from './dtos/new-enterpass-user.dto';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { RefreshTokenDTO } from './dtos/refresh_token.dto';
import { UpdateUserEnterPass } from './dtos/update-user.dto';
import { UserDocument } from './user.schema';
export declare class UserController {
    private userService;
    private readonly httpService;
    constructor(userService: UserService, httpService: HttpService);
    register(user: NewEnterPassUserDTO): Observable<AxiosResponse<any>>;
    login(user: ExistingUserDTO): Promise<any>;
    RevokeToken(data: RefreshTokenDTO): Observable<AxiosResponse<any>>;
    update(id: string, user: UpdateUserEnterPass): Promise<{
        success: boolean;
        message: string;
        data: UserDocument;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
    delete(id: string, user: UpdateUserEnterPass): Promise<any>;
}
