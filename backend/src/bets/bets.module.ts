import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GamesModule } from '../games/games.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { WalletsModule } from '../wallets/wallets.module';
import { BalanceModule } from '../balance/balance.module';

import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';

@Module({
  providers: [BetsService, PrismaService],
  controllers: [BetsController],
  imports: [GamesModule, TransactionsModule, WalletsModule, BalanceModule],
})
export class BetsModule {}
