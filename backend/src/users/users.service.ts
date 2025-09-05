import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateDto } from './dto';
import type { TPublicUser } from './users.types';
import { userResponseFields } from './users.constants';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<TPublicUser[]> {
    return this.prisma.user.findMany({
      select: userResponseFields,
    });
  }

  async getTotalCount(): Promise<number> {
    return this.prisma.user.count();
  }

  async getById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: userResponseFields,
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(payload: CreateDto): Promise<TPublicUser> {
    const { first_name, last_name, password_hash, email, role } = payload;

    return this.prisma.user.create({
      data: {
        role,
        email,
        password_hash,
        first_name,
        last_name,
      },
      select: userResponseFields,
    });
  }
}
