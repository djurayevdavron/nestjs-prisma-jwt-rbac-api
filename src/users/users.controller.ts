import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPERADMIN')
@ApiTags('Users | Foydalanuvchilar')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Get all users | Barcha foydalanuvchilarni olish',
    description:
      'Returns all registered users. Accessible only by SUPERADMIN. | Tizimdagi barcha foydalanuvchilarni qaytaradi. Faqat SUPERADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Users retrieved successfully. | Foydalanuvchilar muvaffaqiyatli olindi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only SUPERADMIN can access this endpoint. | Faqat SUPERADMIN foydalanishi mumkin.',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user by ID | ID orqali foydalanuvchini olish',
    description:
      "Returns a user by their ID. | Berilgan ID bo'yicha foydalanuvchini qaytaradi.",
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID. | Foydalanuvchi ID raqami.',
  })
  @ApiResponse({
    status: 200,
    description:
      'User retrieved successfully. | Foydalanuvchi muvaffaqiyatli olindi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only SUPERADMIN can access this endpoint. | Faqat SUPERADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found. | Foydalanuvchi topilmadi.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usersService.findOne(id);
  }
  @ApiOperation({
    summary: 'Update user | Foydalanuvchini yangilash',
    description:
      "Updates user information by ID. | Berilgan ID bo'yicha foydalanuvchi ma'lumotlarini yangilaydi.",
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID. | Foydalanuvchi ID raqami.',
  })
  @ApiResponse({
    status: 200,
    description:
      'User updated successfully. | Foydalanuvchi muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only SUPERADMIN can access this endpoint. | Faqat SUPERADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found. | Foydalanuvchi topilmadi.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete user | Foydalanuvchini o‘chirish',
    description:
      "Deletes a user by ID. | Berilgan ID bo'yicha foydalanuvchini o'chiradi.",
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID. | Foydalanuvchi ID raqami.',
  })
  @ApiResponse({
    status: 200,
    description:
      "User deleted successfully. | Foydalanuvchi muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only SUPERADMIN can access this endpoint. | Faqat SUPERADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found. | Foydalanuvchi topilmadi.',
  })
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usersService.remove(id);
  }
  @ApiOperation({
    summary:
      "Upload user's profile image | Foydalanuvchi profil rasmini yuklash",
    description:
      'Uploads a profile image for the selected user. | Tanlangan foydalanuvchi uchun profil rasmini yuklaydi.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User ID. | Foydalanuvchi ID raqami.',
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
      'Profile image uploaded successfully. | Profil rasmi muvaffaqiyatli yuklandi.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki noto'g'ri.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only SUPERADMIN can access this endpoint. | Faqat SUPERADMIN foydalanishi mumkin.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found. | Foydalanuvchi topilmadi.',
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
    return this.usersService.uploadImage(id, file.filename);
  }
}
