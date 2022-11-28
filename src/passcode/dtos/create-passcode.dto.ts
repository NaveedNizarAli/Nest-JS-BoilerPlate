import { Type } from 'class-transformer';
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePassCodeDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  lockId: string;

  @IsNotEmpty()
  @IsNumber()
  keyboardPwdType: Number;

  @IsNotEmpty()
  @IsNumber()
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
