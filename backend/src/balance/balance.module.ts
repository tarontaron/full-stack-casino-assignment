import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';
import { TransactionsModule } from '../transactions/transactions.module';

import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { BalanceGateway } from './balance.gateway';

@Module({
  providers: [BalanceService, BalanceGateway, PrismaService],
  controllers: [BalanceController],
  imports: [UsersModule, WalletsModule, TransactionsModule],
  exports: [BalanceService],
})
export class BalanceModule {}
