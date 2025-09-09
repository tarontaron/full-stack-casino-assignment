import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  TAverageBetSizeRow,
  TMostPopularGameRow,
  TPlayerRevenueRow,
  TRevenueByGameRow,
  TRtpComparisonRow,
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
            COALESCE(ABS(SUM(
                    CASE
                        WHEN t.type = 'BET' AND t.outcome = 'LOSS' THEN t.amount  -- casino earns
                        WHEN t.type = 'WIN' THEN -t.amount                        -- casino pays out
                        ELSE 0
                        END
                         )
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
        COALESCE(ABS(SUM(
          CASE 
            WHEN t.type = 'BET' AND t.outcome = 'LOSS' THEN t.amount
            WHEN t.type = 'WIN' THEN -t.amount
            ELSE 0
          END
        )), 0) AS revenue
      FROM transactions t;
    `;

    return result[0];
  }

  async getCasinoRevenueByGame(): Promise<TRevenueByGameRow[]> {
    return this.prisma.$queryRaw<TRevenueByGameRow[]>`
      SELECT
        g.id AS game_id,
        g.name AS game_name,
        COALESCE(ABS(SUM(
          CASE
            WHEN t.type = 'BET' AND t.outcome = 'LOSS' THEN t.amount 
            WHEN t.type = 'WIN' THEN -t.amount
            ELSE 0
          END
        )), 0) AS revenue
      FROM games g
      JOIN bets b ON b.game_id = g.id
      JOIN transactions t ON t.bet_id = b.id
      GROUP BY g.id, g.name
      ORDER BY revenue DESC;
    `;
  }

  // We can create most popular games configurable. In this case it returns games with bets more than 10
  async getMostPopularGames(): Promise<TMostPopularGameRow[]> {
    return this.prisma.$queryRaw<TMostPopularGameRow[]>`
    SELECT
      g.id AS game_id,
      g.name AS game_name,
      CAST(COUNT(b.id) AS INTEGER) AS total_bets
    FROM games g
    JOIN bets b ON b.game_id = g.id
    GROUP BY g.id, g.name
    HAVING COUNT(b.id) > 10
    ORDER BY total_bets DESC;
  `;
  }

  async getAverageBetSizePerGame(): Promise<TAverageBetSizeRow[]> {
    return this.prisma.$queryRaw<TAverageBetSizeRow[]>`
    SELECT
      g.id AS game_id,
      g.name AS game_name,
      CAST(AVG(b.amount) AS NUMERIC(15,2)) AS average_bet_size
    FROM games g
    JOIN bets b ON b.game_id = g.id
    GROUP BY g.id, g.name
    ORDER BY average_bet_size DESC;
  `;
  }

  async getRTPComparison(): Promise<TRtpComparisonRow[]> {
    return this.prisma.$queryRaw<TRtpComparisonRow[]>`
    SELECT
      g.id AS game_id,
      g.name AS game_name,
      g.rtp AS theoretical_rtp,
      CAST(
        CASE 
          WHEN SUM(CASE WHEN t.type = 'BET' THEN t.amount ELSE 0 END) > 0
          THEN (SUM(CASE WHEN t.type = 'WIN' THEN t.amount ELSE 0 END) 
               / SUM(CASE WHEN t.type = 'BET' THEN t.amount ELSE 0 END)) * 100
          ELSE 0
        END
      AS NUMERIC(5,2)) AS actual_rtp
    FROM games g
    JOIN bets b ON b.game_id = g.id
    JOIN transactions t ON t.bet_id = b.id
    GROUP BY g.id, g.name, g.rtp
    ORDER BY g.id;
  `;
  }
}
