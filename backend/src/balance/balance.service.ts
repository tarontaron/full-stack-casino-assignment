import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TransactionType } from '@prisma/client';

import { BALANCE_ERRORS, COMMON_ERRORS } from '../common/constants/errors';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { WalletsService } from '../wallets/wallets.service';
import { TransactionsService } from '../transactions/transactions.service';

import { DepositDto, WithdrawDto } from './dto';
import { BalanceGateway } from './balance.gateway';

@Injectable()
export class BalanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly walletsService: WalletsService,
    private readonly transactionsService: TransactionsService,
    private readonly balanceGateway: BalanceGateway,
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

  async incrementBalance(
    user_id: number,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const wallet = await this.walletsService.getWalletByUserId(user_id, tx);
    if (!wallet) {
      throw new NotFoundException(BALANCE_ERRORS.WALLET_NOT_FOUND);
    }

    const updatedWallet = await this.walletsService.incrementWalletBalanceById(
      wallet.id,
      amount,
      tx,
    );

    this.balanceGateway.sendUserBalance(
      user_id,
      updatedWallet.balance.toNumber(),
    );

    return updatedWallet.balance.toNumber();
  }

  async decrementBalance(
    user_id: number,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const wallet = await this.walletsService.getWalletByUserId(user_id, tx);
    if (!wallet) {
      throw new NotFoundException(BALANCE_ERRORS.WALLET_NOT_FOUND);
    }

    const updatedWallet = await this.walletsService.decrementWalletBalanceById(
      wallet.id,
      amount,
      tx,
    );

    this.balanceGateway.sendUserBalance(
      user_id,
      updatedWallet.balance.toNumber(),
    );

    return updatedWallet.balance.toNumber();
  }

  async deposit(user_id: number, payload: DepositDto): Promise<boolean> {
    const { amount } = payload;

    const wallet = await this.walletsService.getWalletByUserId(user_id);
    if (!wallet) {
      throw new NotFoundException(BALANCE_ERRORS.WALLET_NOT_FOUND);
    }

    const { updatedWallet } = await this.prisma.$transaction(async (tx) => {
      const transaction = await this.transactionsService.create(
        {
          amount,
          wallet_id: wallet.id,
          type: TransactionType.DEPOSIT,
        },
        tx,
      );

      const updatedWallet =
        await this.walletsService.incrementWalletBalanceById(
          wallet.id,
          amount,
          tx,
        );

      return { transaction, updatedWallet };
    });

    this.balanceGateway.sendUserBalance(
      user_id,
      updatedWallet.balance.toNumber(),
    );

    return true;
  }

  async withdraw(user_id: number, payload: WithdrawDto): Promise<boolean> {
    const { amount } = payload;

    const wallet = await this.walletsService.getWalletByUserId(user_id);
    if (!wallet) {
      throw new NotFoundException(BALANCE_ERRORS.WALLET_NOT_FOUND);
    }

    const currentBalance = wallet.balance.toNumber();

    if (currentBalance < amount || currentBalance - amount < 0) {
      throw new NotFoundException(BALANCE_ERRORS.INSUFFICIENT_FUNDS);
    }

    const { updatedWallet } = await this.prisma.$transaction(async (tx) => {
      const transaction = await this.transactionsService.create(
        {
          amount,
          wallet_id: wallet.id,
          type: TransactionType.WITHDRAWAL,
        },
        tx,
      );

      const updatedWallet =
        await this.walletsService.decrementWalletBalanceById(
          wallet.id,
          amount,
          tx,
        );

      return { transaction, updatedWallet };
    });

    this.balanceGateway.sendUserBalance(
      user_id,
      updatedWallet.balance.toNumber(),
    );

    return true;
  }
}
