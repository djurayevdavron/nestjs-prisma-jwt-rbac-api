import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @Matches(/^[A-Za-zʻʼ' ]+$/, {
    message: "name faqat harflardan iborat bo'lishi kerak",
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
