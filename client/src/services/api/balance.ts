import type { TDepositBalancePayload, TWithdrawBalancePayload } from '../../types/balance';
import client from './apiClient';

const balance = {
  get: () => client.get<number>('/v1/balance'),
  deposit: (payload: TDepositBalancePayload) => client.post<boolean>('/v1/balance/deposit', payload),
  withdraw: (payload: TWithdrawBalancePayload) => client.post<boolean>('/v1/balance/withdraw', payload),
}

export default balance;
