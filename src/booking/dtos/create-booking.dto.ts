import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDTO {

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
  contactId: string;

  @IsNotEmpty()
  @IsString()
  lockId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  enterpassLockId: string;

  @IsNotEmpty()
  @IsString()
  accessToken : string;

  @IsNotEmpty()
  @IsString()
  contactName : string;


}
