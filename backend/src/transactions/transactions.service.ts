import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  getById(id: number): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }
}
