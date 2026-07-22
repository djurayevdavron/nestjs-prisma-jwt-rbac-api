import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'davron@gmail.com',
    maxLength: 100,
    description:
      "User email address. | Foydalanuvchining elektron pochta manzili.",
  })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: '123456',
    minLength: 6,
    maxLength: 50,
    description:
      "User password. | Foydalanuvchi paroli.",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}