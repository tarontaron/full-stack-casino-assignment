import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';

import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  providers: [BalanceService],
  controllers: [BalanceController],
  imports: [UsersModule, WalletsModule],
  exports: [BalanceService],
})
export class BalanceModule {}
