import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { TRevenueTotal } from "../../types/table";

const useTotalRevenue = () => {
  const queryKey = ["totalRevenue"];

  return useQuery<TRevenueTotal[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.statistic.totalRevenue();
      return data;
    },
  });
};

export default useTotalRevenue;
