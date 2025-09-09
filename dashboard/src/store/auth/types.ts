export type TAuthStore = {
  isLogged: boolean;
  isLoading: boolean;
  user: TStoreUser | null;
  init: () => Promise<void>;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
};

export type TStoreUser = {
  id: string;
  email: string;
};
