import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { TAverageGameBetSizeRow } from '../../types/table';

const useGetAverageGameBetSize = () => {
  const queryKey = ["playersByRevenue"];

  return useQuery<TAverageGameBetSizeRow[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.statistic.averageGameBetSize();
      return data;
    },
    refetchInterval: 10000,
  });
};

export default useGetAverageGameBetSize;
