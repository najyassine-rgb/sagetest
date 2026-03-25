import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  role?: string;
}
