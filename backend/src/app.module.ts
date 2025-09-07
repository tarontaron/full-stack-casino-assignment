import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { GamesModule } from './games/games.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BalanceModule } from './balance/balance.module';
import { StatisticModule } from './statistic/statistic.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    GamesModule,
    TransactionsModule,
    WalletsModule,
    BalanceModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
