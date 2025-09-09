import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { TMostPopularGameRow } from '../../types/table';

const useGetMostPopularGames = () => {
  const queryKey = ["mostPopularGames"];

  return useQuery<TMostPopularGameRow[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.statistic.mostPopularGames();
      return data;
    },
    refetchInterval: 10000,
  });
};

export default useGetMostPopularGames;
