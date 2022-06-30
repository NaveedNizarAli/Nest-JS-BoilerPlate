import {  IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
  

  @IsNotEmpty()
  @IsString()
  homeAddress: string;
}
