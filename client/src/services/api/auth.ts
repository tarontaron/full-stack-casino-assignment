import type { TLoginPayload } from '../../types';

import client from './apiClient';

const endpoints = {
  findMe: () => client.get('/v1/users/me'),
  login: (payload: TLoginPayload) => client.post('/v1/auth/login', payload),
};

export default endpoints;
