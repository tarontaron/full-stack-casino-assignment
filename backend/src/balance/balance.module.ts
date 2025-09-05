import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';
import { TransactionsModule } from '../transactions/transactions.module';

import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  providers: [BalanceService, PrismaService],
  controllers: [BalanceController],
  imports: [UsersModule, WalletsModule, TransactionsModule],
  exports: [BalanceService],
})
export class BalanceModule {}
