import type {
  TAverageGameBetSizeRow,
  TMostPopularGameRow,
  TPlayerRevenueRow,
  TRevenueByGameRow,
  TRevenueTotal, TRTPComparisonRow,
} from '../../types/table';
import client from '../client';

const endpoints = {
  playersByRevenue: () => client.get<TPlayerRevenueRow[]>('/v1/statistic/playersByRevenue'),
  gamesByRevenue: () => client.get<TRevenueByGameRow[]>('/v1/statistic/revenueByGame'),
  averageGameBetSize: () => client.get<TAverageGameBetSizeRow[]>('/v1/statistic/averageBetSizePerGame'),
  mostPopularGames: () => client.get<TMostPopularGameRow[]>('/v1/statistic/mostPopularGames'),
  totalRevenue: () => client.get<TRevenueTotal>('/v1/statistic/totalRevenue'),
  rtpComparison: () => client.get<TRTPComparisonRow[]>('/v1/statistic/getRTPComparison'),
};

export default endpoints;
