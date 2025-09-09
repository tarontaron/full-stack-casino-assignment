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

export type TAverageGameBetSizeRow = {
  game_id: number;
  game_name: string;
  average_bet_size: string;
};

export type TMostPopularGameRow = {
  game_id: number;
  game_name: string;
  total_bets: number;
};


export type TRTPComparisonRow = {
  game_id: number;
  game_name: string;
  theoretical_rtp: string;
  actual_rtp: string;
}

export type TRevenueTotal = {
  revenue: string;
}
