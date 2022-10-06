import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProfileTypeEnum } from 'src/enums/profileEnum';

export class UpdateUserEnterPass {
  
  @IsString()
  @IsOptional()
  accessToken: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsInt()
  @IsOptional()
  uid: number;

  @IsInt()
  @IsOptional()
  openid: number;

  @IsString()
  @IsOptional()
  scope: string;
  
  @IsString()
  @IsOptional()
  refresh_token: string;

  @IsString()
  @IsOptional()
  access_token: string;

  @IsNumber()
  @IsOptional()
  profileType: number;

  @IsString()
  @IsOptional()
  locationName : string;

  @IsNumber()
  @IsOptional()
  longitude : number;
 
  @IsNumber()
  @IsOptional()
  latitude : number;

  @IsString()
  @IsOptional()
  oneSignalId : string;

  @IsString()
  @IsOptional()
  phoneNumber : string;

  @IsString()
  @IsOptional()
  dialingCode : string;

  @IsString()
  @IsOptional()
  fullName : string;

  @IsBoolean()
  @IsOptional()
  delete : Boolean;

  
}
