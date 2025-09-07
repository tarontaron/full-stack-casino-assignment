import { create } from 'zustand';
import Cookies from 'js-cookie';
import api from '../services/api';

export type TAuthStore = {
  isLogged: boolean;
  isLoading: boolean;
  user: TUser | null;
  init: () => Promise<void>;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
};

export type TUser = {
  id: string;
  first_name: string;
  last_name: string;
};

export const useAuthStore = create<TAuthStore>()((set, get) => ({
  user: null,
  isLogged: true,
  isLoading: true,
  init: async () => {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      set({ user: null, isLogged: false, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });

      const { data } = await api.auth.findMe();

      set({ user: data, isLogged: true });
    } catch (e) {
      get().logout();
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (accessToken: string) => {
    Cookies.set('access_token', accessToken);
    await get().init();
  },
  logout: () => {
    set({ user: null, isLogged: false, isLoading: false });
    Cookies.remove('access_token');
  },
}));
