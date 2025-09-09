import type { TGame } from '../../types/games';
import client from './apiClient';

const game = {
  list: () => client.get<TGame[]>('/v1/games/listAll'),
}

export default game;
