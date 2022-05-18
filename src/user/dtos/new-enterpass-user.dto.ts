import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class NewEnterPassUserDTO {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  date: string;
}
