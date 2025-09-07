import { create } from 'zustand';

export type TBalanceStore = {
  balance: number;
  setBalance: (balance: number) => void;
};

export const useBalanceStore = create<TBalanceStore>()((set) => ({
  balance: 0,
  setBalance: (balance) => set({
    balance,
  })
}));
