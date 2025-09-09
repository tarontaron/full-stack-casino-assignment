import { useMutation } from '@tanstack/react-query';
import type { TDepositBalancePayload } from '../../types/balance.ts';
import api from '../api';

const useDepositBalanceMutation = () => {
  const mutationKey = ['depositBalance'];

  return useMutation({
    mutationKey,
    mutationFn: async (payload: TDepositBalancePayload) => {
      const { data } = await api.balance.deposit(payload);

      return data;
    },
  });
};

export default useDepositBalanceMutation;
