import type { TStoreUser } from '../../store/auth/types.ts';
import type { TAuthResponse, TLoginPayload } from '../../types/auth';
import client from '../client';

const endpoints = {
  findMe: () => client.get<TStoreUser>('/v1/users/me'),
  login: (payload: TLoginPayload) => client.post<TAuthResponse>('/v1/auth/operator/login', payload),
};

export default endpoints;
