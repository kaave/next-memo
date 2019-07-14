import { createStandardAction, createAsyncAction, ActionType } from 'typesafe-actions';

import { PickUp } from '~/types/utils';
import { types } from './types';

const {
  RESET,
  INCREMENT,
  DECREMENT,
  ADD,
  ASYNC_INCREMENT_REQUEST,
  ASYNC_INCREMENT_SUCCESSED,
  ASYNC_INCREMENT_FAILED,
} = types;

export const actions = {
  reset: createStandardAction(RESET)(),
  increment: createStandardAction(INCREMENT).map(() => ({ payload: { count: 1 } })),
  decrement: createStandardAction(DECREMENT).map(() => ({ payload: { count: -1 } })),
  add: createStandardAction(ADD).map(({ count }: { count: number }) => ({
    payload: { count },
  })),
  asyncIncrement: createAsyncAction(ASYNC_INCREMENT_REQUEST, ASYNC_INCREMENT_SUCCESSED, ASYNC_INCREMENT_FAILED)<
    PickUp<AsyncIncrementRequestAction, 'payload'>,
    { count: number },
    { message: Error }
  >(),
};

export type Action = ActionType<typeof actions>;

/*
 * async actions
 */
export type AsyncIncrementRequestAction = {
  type: typeof ASYNC_INCREMENT_REQUEST;
  payload: { count: number; callingFailed?: boolean };
};
