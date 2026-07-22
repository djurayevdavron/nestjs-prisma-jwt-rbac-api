import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Davron Jurayev',
    minLength: 3,
    maxLength: 30,
    description:
      "User full name. Only letters and spaces are allowed. | Foydalanuvchining to'liq ismi. Faqat harflar va bo'sh joylarga ruxsat beriladi.",
  })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  @Matches(/^[A-Za-zʻʼ' ]+$/, {
    message: "name faqat harflardan iborat bo'lishi kerak",
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'davron@gmail.com',
    maxLength: 100,
    description:
      "User email address. | Foydalanuvchining elektron pochta manzili.",
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;
}