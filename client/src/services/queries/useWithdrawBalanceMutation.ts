import { useMutation } from '@tanstack/react-query';
import type { TWithdrawBalancePayload } from '../../types/balance.ts';
import api from '../api';

const useWithdrawBalanceMutation = () => {
  const mutationKey = ['withdrawBalance'];

  return useMutation({
    mutationKey,
    mutationFn: async (payload: TWithdrawBalancePayload) => {
      const { data } = await api.balance.withdraw(payload);

      return data;
    },
  });
};

export default useWithdrawBalanceMutation;
