import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserEnterPass {

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  date: string;

  @IsInt()
  uid: number;

  @IsInt()
  openid: number;

  @IsString()
  scope: string;
  
}
