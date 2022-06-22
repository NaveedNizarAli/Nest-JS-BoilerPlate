import {  IsNotEmpty, IsString } from 'class-validator';

export class DeleteLockDTO {

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  lockId: string;

  @IsNotEmpty()
  _id: string;

}
