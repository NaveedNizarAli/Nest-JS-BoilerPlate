import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProfileTypeEnum } from 'src/enums/profileEnum';

export class UpdateUserEnterPass {
  
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

  @IsNumber({},{each: true})
  @IsEnum(ProfileTypeEnum)
  @IsOptional()
  profileType: number[];

  
}
