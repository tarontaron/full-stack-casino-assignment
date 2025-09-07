export * from './auth';

export enum ESocketEvents {
  SUBSCRIBE = 'subscribe',
  BALANCE_UPDATE = 'balance_update'
}

export type TSocketMessage<T = unknown> = {
  event: ESocketEvents;
  data?: T;
};

export type TSocketResponse<T = unknown> = {
  data: T;
  event: ESocketEvents;
};
