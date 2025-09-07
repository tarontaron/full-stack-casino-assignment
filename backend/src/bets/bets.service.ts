import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bet, Prisma, TransactionType } from '@prisma/client';

import { BALANCE_ERRORS } from '../common/constants/errors';
import { PrismaService } from '../prisma/prisma.service';
import { GamesService } from '../games/games.service';
import { TransactionsService } from '../transactions/transactions.service';
import { WalletsService } from '../wallets/wallets.service';
import { BalanceService } from '../balance/balance.service';

import { CreateDto, DoBetDto } from './dto';
import { DoBetResponse } from './bets.types';

@Injectable()
export class BetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamesService: GamesService,
    private readonly balanceService: BalanceService,
    private readonly walletService: WalletsService,
    private readonly transactionService: TransactionsService,
  ) {}

  async create(
    payload: CreateDto,
    tx?: Prisma.TransactionClient,
  ): Promise<Bet> {
    const prismaClient = tx || this.prisma;

    const { user_id, game_id, amount } = payload;

    return prismaClient.bet.create({
      data: {
        amount,
        game_id,
        user_id,
      },
    });
  }

  async doBet(user_id: number, payload: DoBetDto): Promise<DoBetResponse> {
    const { game_id, amount } = payload;

    const { isWin, winAmount } = this.getRandomResults(amount);

    const wallet = await this.walletService.getWalletByUserId(user_id);

    if (!wallet) {
      throw new NotFoundException(BALANCE_ERRORS.WALLET_NOT_FOUND);
    }

    const balance = await this.balanceService.getBalanceByUserId(user_id);

    if (balance - amount < 0) {
      throw new ConflictException(BALANCE_ERRORS.INSUFFICIENT_FUNDS);
    }

    return this.prisma.$transaction(async (tx) => {
      const bet = await this.create(
        {
          amount,
          user_id,
          game_id,
        },
        tx,
      );

      // Update wallet balance.
      await this.balanceService.decrementBalance(user_id, amount, tx);

      // Create BET transaction.
      await this.transactionService.create(
        {
          amount,
          type: TransactionType.BET,
          wallet_id: wallet.id,
          bet_id: bet.id,
        },
        tx,
      );

      if (isWin) {
        // Create WIN transaction.
        await this.transactionService.create(
          {
            amount: winAmount,
            type: TransactionType.WIN,
            wallet_id: wallet.id,
            bet_id: bet.id,
          },
          tx,
        );

        // Update wallet.
        await this.balanceService.incrementBalance(user_id, winAmount, tx);
      }

      return {
        isWin,
        winAmount,
      };
    });
  }

  getRandomResults(amount: number): DoBetResponse {
    const winChance = 0.5; // 50% win chance
    const multiplier = 2; // Win is 2x bet

    const isWin = Math.random() < winChance;
    const winAmount = isWin ? amount * multiplier : 0;

    return { isWin, winAmount };
  }
}
