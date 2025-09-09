import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { TRTPComparisonRow } from '../../types/table';

const useGetRtpComparison = () => {
  const queryKey = ["rtpComparison"];

  return useQuery<TRTPComparisonRow[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.statistic.rtpComparison();

      return data;
    },
    refetchInterval: 10000,
  });
};

export default useGetRtpComparison;
