import {  IsNotEmpty, IsString } from 'class-validator';

export class NewLockDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  lockName: string;

  @IsNotEmpty()
  @IsString()
  lockType: string;

  @IsNotEmpty()
  lockDetail: string;
}
