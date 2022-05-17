import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class NewEnterPassUserDTO {

  @IsNotEmpty()
  @IsString()
  usernameHash: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  date: string;
}
