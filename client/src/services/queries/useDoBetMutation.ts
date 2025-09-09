import { useMutation } from '@tanstack/react-query';
import type { TDoBetPayload } from '../../types/bet';
import api from '../api';

const useDoBetMutation = () => {
  const mutationKey = ['doBet'];

  return useMutation({
    mutationKey,
    mutationFn: async (payload: TDoBetPayload) => {
      const { data } = await api.bet.doBet(payload);

      return data;
    },
  });
};

export default useDoBetMutation;
