import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDTO {

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  dialingCode: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  completePhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  createdBy: string;
}
