import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication | Autentifikatsiya')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get logged in user profile | Login qilgan foydalanuvchi profilini olish',
    description: `Returns the authenticated user profile. | JWT orqali autentifikatsiyadan o'tgan foydalanuvchi ma'lumotlarini qaytaradi.`,
  })
  @ApiResponse({
    status: 200,
    description:
      'User profile returned successfully. | Foydalanuvchi profili muvaffaqiyatli qaytarildi.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. JWT token is missing or invalid. | JWT token mavjud emas yoki notoʻgʻri.',
  })
  @Get('profile')
  profile(@Req() req: any) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Register a new user | Yangi foydalanuvchini roʻyxatdan oʻtkazish',
    description:
      'Creates a new user account. | Yangi foydalanuvchi akkauntini yaratadi.',
  })
  @ApiResponse({
    status: 201,
    description:
      'User registered successfully. | Foydalanuvchi muvaffaqiyatli roʻyxatdan oʻtkazildi.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists. | Ushbu email allaqachon mavjud.',
  })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Login user | Foydalanuvchini tizimga kiritish',
    description:
      'Authenticates the user and returns a JWT access token. | Foydalanuvchini autentifikatsiya qiladi va JWT token qaytaradi.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Login successful. | Tizimga kirish muvaffaqiyatli amalga oshirildi.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password. | Email yoki parol noto`g`ri.',
  })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
