export const COMMON_ERRORS = {
  USER_WITH_ID_NOT_FOUND: (id: number) => `User with ID ${id} not found.`,
};

export const AUTH_ERRORS = {
  INVALID_TOKEN: 'Invalid token.',
  MISSING_TOKEN: 'Missing token.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  USER_EMAIL_EXISTS: 'A user with this email already exists.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
};

export const BALANCE_ERRORS = {
  INSUFFICIENT_FUNDS: 'Insufficient funds.',
  WALLET_NOT_FOUND: 'Wallet not found for the user.',
};
