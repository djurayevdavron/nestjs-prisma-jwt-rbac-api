import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'iPhone 16 Pro',
    minLength: 2,
    maxLength: 50,
    description:
      'Product name. | Mahsulot nomi.',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @ApiPropertyOptional({
    example: 1500,
    minimum: 1,
    maximum: 1000000,
    description:
      'Product price. | Mahsulot narxi.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(1000000)
  price?: number;
}