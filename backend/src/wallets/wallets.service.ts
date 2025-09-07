import { Injectable } from '@nestjs/common';
import type { Prisma, Wallet } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(
    private readonly prisma: PrismaService,

  ) {}

  getWalletByUserId(
    user_id: number,
    tx?: Prisma.TransactionClient,
  ): Promise<Wallet | null> {
    const prismaClient = tx ?? this.prisma;

    return prismaClient.wallet.findUnique({
      where: { user_id },
    });
  }

  async incrementWalletBalanceById(
    id: number,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<Wallet> {
    const prismaClient = tx ?? this.prisma;

    return prismaClient.wallet.update({
      where: { id },
      data: {
        balance: {
          increment: new Decimal(amount),
        },
      },
    });
  }

  async decrementWalletBalanceById(
    id: number,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<Wallet> {
    const prismaClient = tx ?? this.prisma;

    return prismaClient.wallet.update({
      where: { id },
      data: {
        balance: {
          decrement: new Decimal(amount),
        },
      },
    });
  }
}
