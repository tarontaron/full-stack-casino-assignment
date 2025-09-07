import { useQuery } from '@tanstack/react-query';
import api from '../../api';

const useGetBalanceQuery = () => {
  const queryKey = ['getBalance'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.balance.get();

      return data;
    },
  });
};

export default useGetBalanceQuery;
