export type TPlayerRevenueRow = {
  id: number;
  name: string;
  email: string;
  revenue: number;
};

export type TRevenueByGameRow = {
  game_id: number;
  game_name: string;
  revenue: number;
};

export type TTotalCasinoRevenueRow = {
  revenue: number;
};

export type TMostPopularGameRow = {
  game_id: number;
  game_name: string;
  total_bets: number;
};

export type TAverageBetSizeRow = {
  game_id: number;
  game_name: string;
  average_bet_size: number;
};
