import { useQuery } from '@tanstack/react-query';
import api from '../api';

const useGetGamesQuery = () => {
  const queryKey = ['getGames'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.game.list();

      return data;
    },
  });
};

export default useGetGamesQuery;
