import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateDto } from './dto';

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

  async create(
    payload: CreateDto,
    tx?: Prisma.TransactionClient,
  ): Promise<Transaction> {
    const { bet_id, wallet_id, amount, type, outcome } = payload;

    const prismaClient = tx ?? this.prisma;

    return prismaClient.transaction.create({
      data: {
        type,
        amount,
        bet_id,
        wallet_id,
        outcome,
      },
    });
  }
}
