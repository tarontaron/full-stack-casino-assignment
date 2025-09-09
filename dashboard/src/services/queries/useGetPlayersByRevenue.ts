import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { TPlayerRevenueRow } from "../../types/table";

const usePlayersByRevenue = () => {
  const queryKey = ["playersByRevenue"];

  return useQuery<TPlayerRevenueRow[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.statistic.playersByRevenue();
      return data;
    },
    refetchInterval: 10000,
  });
};

export default usePlayersByRevenue;
