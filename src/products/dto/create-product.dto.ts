import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 16 Pro',
    minLength: 2,
    maxLength: 50,
    description:
      "Product name. | Mahsulot nomi.",
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 1500,
    minimum: 1,
    maximum: 1000000,
    description:
      "Product price. | Mahsulot narxi.",
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(1000000)
  price: number;
}