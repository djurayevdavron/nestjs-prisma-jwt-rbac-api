import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Davron Jurayev',
    description:
      "User full name. Only letters and spaces are allowed. | Foydalanuvchining to'liq ismi. Faqat harflar va bo'sh joylarga ruxsat beriladi.",
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @Matches(/^[A-Za-zʻʼ' ]+$/, {
    message: "name faqat harflardan iborat bo'lishi kerak",
  })
  name: string;

  @ApiProperty({
    example: 'davron@gmail.com',
    description:
      "User email address. | Foydalanuvchining elektron pochta manzili.",
  })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: '123456',
    description:
      "User password (6-50 characters). | Foydalanuvchi paroli (6-50 ta belgidan iborat).",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}