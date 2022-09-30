import {  IsNotEmpty, IsString } from 'class-validator';

export class DeleteFingerPrintDTO {

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  lockId: string;

  @IsNotEmpty()
  fingerprintId : Number;

  @IsNotEmpty()
  _id: string;

}
