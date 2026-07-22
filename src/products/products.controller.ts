import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiTags('Products | Mahsulotlar')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOperation({
    summary: 'Get all products | Barcha mahsulotlarni olish',
    description:
      'Returns all products with filtering, sorting and pagination. | Filtrlash, saralash va sahifalash bilan mahsulotlarni qaytaradi.',
  })
  @ApiQuery({
    name: 'contains',
    required: false,
    description: "Search by product name. | Mahsulot nomi bo'yicha qidirish.",
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    example: 100,
    description: 'Minimum price. | Minimal narx.',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    example: 1000,
    description: 'Maximum price. | Maksimal narx.',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    example: 'asc',
    description:
      "Sort by price (asc or desc). | Narx bo'yicha saralash (asc yoki desc).",
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number. | Sahifa raqami.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page. | Har bir sahifadagi mahsulotlar soni.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Products retrieved successfully. | Mahsulotlar muvaffaqiyatli olindi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only ADMIN can access this endpoint. | Faqat ADMIN foydalanishi mumkin.',
  })
  @Get()
  findAll(
    @Query('contains')
    contains?: string,

    @Query('minPrice')
    minPrice?: string,

    @Query('maxPrice')
    maxPrice?: string,

    @Query('sort')
    sort?: string,

    @Query('page')
    page?: string,

    @Query('limit')
    limit?: string,
  ) {
    return this.productsService.findAll(
      contains,
      minPrice,
      maxPrice,
      sort,
      page,
      limit,
    );
  }
  @ApiOperation({
    summary: 'Get product by ID | ID orqali mahsulotni olish',
    description:
      "Returns a product by its ID. | Berilgan ID bo'yicha mahsulotni qaytaradi.",
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product ID. | Mahsulot ID raqami.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Product retrieved successfully. | Mahsulot muvaffaqiyatli olindi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only ADMIN can access this endpoint. | Faqat ADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found. | Mahsulot topilmadi.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productsService.findOne(id);
  }
  @ApiOperation({
    summary: 'Create product | Mahsulot yaratish',
    description:
      'Creates a new product with an image. | Rasm bilan yangi mahsulot yaratadi.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'iPhone 16 Pro',
        },
        price: {
          type: 'number',
          example: 1500,
        },
        image: {
          type: 'string',
          format: 'binary',
          description:
            'Image file (JPG, JPEG, PNG). | Yuklanadigan rasm fayli (JPG, JPEG, PNG).',
        },
      },
      required: ['name', 'price', 'image'],
    },
  })
  @ApiResponse({
    status: 201,
    description:
      'Product created successfully. | Mahsulot muvaffaqiyatli yaratildi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only ADMIN can access this endpoint. | Faqat ADMIN foydalanishi mumkin.',
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);

          cb(null, uniqueName);
        },
      }),
    }),
  )
  create(
    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    dto: CreateProductDto,

    @Req()
    req: any,
  ) {
    return this.productsService.create(dto, req.user.id, file.filename);
  }
  @ApiOperation({
    summary: 'Update product | Mahsulotni yangilash',
    description:
      "Updates product information by ID. | Berilgan ID bo'yicha mahsulot ma'lumotlarini yangilaydi.",
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product ID. | Mahsulot ID raqami.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Product updated successfully. | Mahsulot muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only ADMIN can access this endpoint. | Faqat ADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found. | Mahsulot topilmadi.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }
  @ApiOperation({
    summary: "Delete product | Mahsulotni o'chirish",
    description:
      "Deletes a product by ID. | Berilgan ID bo'yicha mahsulotni o'chiradi.",
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product ID. | Mahsulot ID raqami.',
  })
  @ApiResponse({
    status: 200,
    description:
      "Product deleted successfully. | Mahsulot muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only ADMIN can access this endpoint. | Faqat ADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found. | Mahsulot topilmadi.',
  })
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productsService.remove(id);
  }
  @ApiOperation({
    summary: 'Upload product image | Mahsulot rasmini yuklash',
    description:
      'Uploads an image for the selected product. | Tanlangan mahsulot uchun rasm yuklaydi.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product ID. | Mahsulot ID raqami.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description:
            'Image file (JPG, JPEG, PNG). | Yuklanadigan rasm fayli (JPG, JPEG, PNG).',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'Product image uploaded successfully. | Mahsulot rasmi muvaffaqiyatli yuklandi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only ADMIN can access this endpoint. | Faqat ADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found. | Mahsulot topilmadi.',
  })
  @Patch(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);

          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadImage(
    @Param('id', ParseIntPipe)
    id: number,

    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.productsService.uploadImage(id, file.filename);
  }
}
