import type { TMostPopularGameRow, TPlayerRevenueRow, TRevenueByGameRow, TRevenueTotal } from '../../types/table';
import client from '../client.ts';

const endpoints = {
  playersByRevenue: () => client.get<TPlayerRevenueRow[]>('/v1/statistic/playersByRevenue'),
  gamesByRevenue: () => client.get<TRevenueByGameRow[]>('/v1/statistic/revenueByGame'),
  mostPopularGames: () => client.get<TMostPopularGameRow[]>('/v1/statistic/mostPopularGames'),
  totalRevenue: () => client.get<TRevenueTotal>('/v1/statistic/totalRevenue'),
};

export default endpoints;
