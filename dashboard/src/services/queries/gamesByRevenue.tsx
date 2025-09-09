import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { TRevenueByGameRow } from "../../types/table";

const useGamesByRevenue = () => {
  const queryKey = ["playersByRevenue"];

  return useQuery<TRevenueByGameRow[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.statistic.gamesByRevenue();
      return data;
    },
  });
};

export default useGamesByRevenue;
