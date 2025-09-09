import type { TPlayerRevenueRow, TRevenueByGameRow, TRevenueTotal } from '../../types/table';
import client from '../client';

const endpoints = {
  playersByRevenue: () => client.get<TPlayerRevenueRow[]>('/v1/statistic/playersByRevenue'),
  gamesByRevenue: () => client.get<TRevenueByGameRow[]>('/v1/statistic/revenueByGame'),
  totalRevenue: () => client.get<TRevenueTotal[]>('/v1/statistic/totalRevenue'),
};

export default endpoints;
 