import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        products: true,
      },
    });

    return users.map((user) => ({
      ...user,
      image: user.image ? `http://localhost:3000/uploads/${user.image}` : null,
    }));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        products: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      image: user.image ? `http://localhost:3000/uploads/${user.image}` : null,
    };
  }
  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        products: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });
  }
  async uploadImage(id: number, image: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        products: true,
      },
    });
  }
}
