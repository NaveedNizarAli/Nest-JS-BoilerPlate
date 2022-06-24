import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetRecordsDTO {


  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  lockId: string;

  @IsOptional()
  @IsString()
  records: string;
}
