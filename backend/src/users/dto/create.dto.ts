import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateDto {
  @IsEnum(Role)
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password_hash: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
}
