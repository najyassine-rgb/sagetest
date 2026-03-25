import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  login: string;

  @IsNotEmpty()
  password: string;
}
