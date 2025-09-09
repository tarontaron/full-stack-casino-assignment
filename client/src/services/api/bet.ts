import type { TDoBetPayload } from '../../types/bet';
import client from './apiClient';

const bet = {
  doBet: (payload: TDoBetPayload) => client.post<boolean>('/v1/bets/doBet', payload),
}

export default bet;
