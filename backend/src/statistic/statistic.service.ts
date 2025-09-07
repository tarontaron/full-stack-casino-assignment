import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  TPlayerRevenueRow,
  TRevenueByGameRow,
  TTotalCasinoRevenueRow,
} from './statistic.types';

@Injectable()
export class StatisticService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlayersByCasinoRevenue(): Promise<TPlayerRevenueRow[]> {
    return this.prisma.$queryRaw<TPlayerRevenueRow[]>`
      SELECT 
        u.id,
        u.first_name || ' ' || u.last_name AS name,
        u.email,
        COALESCE(SUM(
          CASE
            WHEN t.type = 'BET' AND t.outcome = 'LOSS' THEN t.amount
            WHEN t.type = 'WIN' THEN -t.amount
            ELSE 0
          END
        ), 0) AS revenue
      FROM users u
      JOIN wallets w ON w.user_id = u.id
      LEFT JOIN transactions t ON t.wallet_id = w.id
      WHERE u.role = 'PLAYER'
      GROUP BY u.id, u.first_name, u.last_name, u.email
      ORDER BY revenue DESC;
    `;
  }

  async getTotalCasinoRevenue(): Promise<TTotalCasinoRevenueRow> {
    const result = await this.prisma.$queryRaw<TTotalCasinoRevenueRow[]>`
      SELECT 
        COALESCE(SUM(
          CASE 
            WHEN t.type = 'BET' AND t.outcome = 'LOSS' THEN t.amount
            WHEN t.type = 'WIN' THEN -t.amount
            ELSE 0
          END
        ), 0) AS revenue
      FROM transactions t;
    `;

    return result[0];
  }

  async getCasinoRevenueByGame(): Promise<TRevenueByGameRow[]> {
    return this.prisma.$queryRaw<TRevenueByGameRow[]>`
      SELECT
        g.id AS game_id,
        g.name AS game_name,
        COALESCE(SUM(
          CASE
            WHEN t.type = 'BET' AND t.outcome = 'LOSS' THEN t.amount 
            WHEN t.type = 'WIN' THEN -t.amount
            ELSE 0
          END
        ), 0) AS revenue
      FROM games g
      JOIN bets b ON b.game_id = g.id
      JOIN transactions t ON t.bet_id = b.id
      GROUP BY g.id, g.name
      ORDER BY revenue DESC;
    `;
  }
}
