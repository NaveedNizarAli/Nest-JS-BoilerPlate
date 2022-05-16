import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {

  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
