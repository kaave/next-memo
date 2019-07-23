import { createStandardAction, ActionType } from 'typesafe-actions';

import { types } from './types';

const {
  RESET,
  INCREMENT,
  DECREMENT,
  ADD,
  ASYNC_INCREMENT_REQUEST,
  ASYNC_INCREMENT_SUCCESS,
  ASYNC_INCREMENT_FAILURE,
} = types;

export const actions = {
  reset: createStandardAction(RESET)(),
  increment: createStandardAction(INCREMENT).map(() => ({ payload: { count: 1 } })),
  decrement: createStandardAction(DECREMENT).map(() => ({ payload: { count: -1 } })),
  add: createStandardAction(ADD).map(({ count }: { count: number }) => ({
    payload: { count },
  })),
  asyncIncrementRequest: createStandardAction(ASYNC_INCREMENT_REQUEST)(),
  asyncIncrementSuccess: createStandardAction(ASYNC_INCREMENT_SUCCESS).map(({ count }: { count: number }) => ({
    payload: { count },
  })),
  asyncIncrementFailure: createStandardAction(ASYNC_INCREMENT_FAILURE).map(({ message }: { message: Error }) => ({
    error: { message },
  })),
};

export type Action = ActionType<typeof actions>;
