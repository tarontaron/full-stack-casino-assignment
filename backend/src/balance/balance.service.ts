import { Injectable, NotFoundException } from '@nestjs/common';

import { BALANCE_ERRORS, COMMON_ERRORS } from '../common/constants/errors';

import { UsersService } from '../users/users.service';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class BalanceService {
  constructor(
    private readonly usersService: UsersService,
    private readonly walletsService: WalletsService,
  ) {}

  async getBalanceByUserId(user_id: number): Promise<number> {
    const user = await this.usersService.getById(user_id);
    if (!user) {
      throw new NotFoundException(
        COMMON_ERRORS.USER_WITH_ID_NOT_FOUND(user_id),
      );
    }

    const wallet = await this.walletsService.getWalletByUserId(user_id);
    if (!wallet) {
      throw new NotFoundException(BALANCE_ERRORS.WALLET_NOT_FOUND);
    }

    return wallet.balance.toNumber();
  }
}
