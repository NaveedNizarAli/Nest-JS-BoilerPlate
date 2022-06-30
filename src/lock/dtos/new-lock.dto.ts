import {  IsArray, IsNotEmpty, IsString } from 'class-validator';

export class NewLockDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  lockData: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  lockName: string;

  @IsNotEmpty()
  @IsString()
  homeId: string;
}
