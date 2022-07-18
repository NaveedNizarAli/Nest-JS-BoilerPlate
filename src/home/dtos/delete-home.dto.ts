import {  IsNotEmpty, IsString } from 'class-validator';

export class DeleteHomeDTO {

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  homeId: string;

  @IsNotEmpty()
  _id: string;

}
