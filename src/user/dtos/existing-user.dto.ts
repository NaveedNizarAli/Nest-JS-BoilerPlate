import { IsNotEmpty, IsString } from "class-validator";

export class ExistingUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
