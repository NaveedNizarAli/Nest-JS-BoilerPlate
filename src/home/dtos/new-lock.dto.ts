import {  IsArray, IsNotEmpty, IsString } from 'class-validator';

export class NewHomeDTO {

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsArray()
  homeImages: string[];

  @IsNotEmpty()
  @IsString()
  homeName: string;

  @IsNotEmpty()
  @IsString()
  homeAddress: string[];
}
