import { useMutation } from '@tanstack/react-query';
import type { TLoginPayload } from '../../types/auth';
import api from '../../services/api';

const useLoginMutation = () => {
  const mutationKey = ['login'];

  return useMutation({
    mutationKey,
    mutationFn: async (payload: TLoginPayload) => {
      const { data } = await api.auth.login(payload);

      return data;
    },
  });
};

export default useLoginMutation;
