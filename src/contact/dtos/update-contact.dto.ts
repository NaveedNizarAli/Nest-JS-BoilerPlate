import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContactDTO {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  dialingCode: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  completePhoneNumber: string;

}
