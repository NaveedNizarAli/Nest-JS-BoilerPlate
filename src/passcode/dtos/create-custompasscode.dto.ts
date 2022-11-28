import { Type } from 'class-transformer';
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomPassCodeDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  lockId: string;

  @IsNotEmpty()
  @IsNumber()
  keyboardPwd: Number;

  @IsNotEmpty()
  @IsString()
  keyboardPwdName: string;

  @IsNotEmpty()
  @IsString()
  accessToken : string;

  @IsNotEmpty()
  @IsNumber()
  startDate: Number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  endDate: Number;


}
