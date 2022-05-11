import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NewUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
