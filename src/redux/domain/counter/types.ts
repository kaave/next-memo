export const actionTypes = Object.freeze({
  RESET: '@DOMAIN/COUNTER/RESET',
  INCREMENT: '@DOMAIN/COUNTER/INCREMENT',
  DECREMENT: '@DOMAIN/COUNTER/DECREMENT',
  ADD: '@DOMAIN/COUNTER/ADD',
} as const);
export const sagaTypes = Object.freeze({
  ASYNC_INCREMENT_REQUEST: '@DOMAIN/COUNTER/ASYNC_INCREMENT_REQUEST',
  ASYNC_INCREMENT_SUCCESS: '@DOMAIN/COUNTER/ASYNC_INCREMENT_SUCCESS',
  ASYNC_INCREMENT_FAILURE: '@DOMAIN/COUNTER/ASYNC_INCREMENT_FAILURE',
} as const);
export const types = Object.freeze({ ...actionTypes, ...sagaTypes } as const);

export type State = { count: number; execRequest: boolean };
