import { Injectable } from '@nestjs/common';
import type { Wallet } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  getWalletByUserId(user_id: number): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({
      where: { user_id },
    });
  }
}
