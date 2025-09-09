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

export type TMostPopularGameRow = {
  game_id: number;
  game_name: string;
  total_bets: number;
};

export type TRevenueTotal = {
  revenue: string;
}
