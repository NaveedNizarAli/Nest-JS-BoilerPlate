import {  IsNotEmpty, IsString } from 'class-validator';

export class NewLockDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  lockData: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
