import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    contains?: string,
    minPrice?: string,
    maxPrice?: string,
    sort?: string,
    page?: string,
    limit?: string,
  ) {
    let skip: number | undefined;
    let take: number | undefined;

    if (page || limit) {
      const currentPage = Number(page) || 1;
      take = Number(limit) || 3;
      skip = (currentPage - 1) * take;
    }
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: contains,
          mode: 'insensitive',
        },

        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined,
        },
      },

      orderBy: sort
        ? {
            price: sort === 'desc' ? 'desc' : 'asc',
          }
        : undefined,

      skip,
      take,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return products.map((product) => ({
      ...product,
      image: product.image
        ? `http://localhost:3000/uploads/${product.image}`
        : null,
    }));
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      ...product,
      image: product.image
        ? `http://localhost:3000/uploads/${product.image}`
        : null,
    };
  }

  create(dto: CreateProductDto, userId: number, image: string) {
    return this.prisma.product.create({
      data: {
        ...dto,
        image,
        userId,
      },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }
  async uploadImage(id: number, image: string) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: {
        image,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
