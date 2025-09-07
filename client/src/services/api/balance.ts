import client from './apiClient';

const balance = {
  get: () => client.get<number>('/v1/balance'),
}

export default balance;
