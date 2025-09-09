export type TLoginForm = {
  email: string;
  password: string;
};

// API TYPES
export type TLoginPayload = TLoginForm;

export type TAuthResponse = {
  access_token: string;
};
