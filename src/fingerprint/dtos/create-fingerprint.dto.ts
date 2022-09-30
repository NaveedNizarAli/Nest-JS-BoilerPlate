import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFingerPrintDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsNumber()
  startDate: Number;

  @IsNotEmpty()
  @IsNumber()
  endDate: Number;

  @IsNotEmpty()
  @IsString()
  lockId: string;

  @IsNotEmpty()
  @IsNumber()
  fingerprintNumber: Number;

  @IsNotEmpty()
  @IsString()
  fingerprintName: string;

  @IsNotEmpty()
  @IsString()
  accessToken : string;


}
