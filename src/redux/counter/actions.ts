import { createStandardAction, createAsyncAction } from 'typesafe-actions';

import { PickUp } from '~/types/utils';

export const actionTypes = Object.freeze({
  RESET: '@@COUNTER/RESET',
  INCREMENT: '@@COUNTER/INCREMENT',
  DECREMENT: '@@COUNTER/DECREMENT',
  ADD: '@@COUNTER/ADD',
} as const);
export const sagaTypes = Object.freeze({
  ASYNC_INCREMENT_REQUEST: '@@COUNTER/ASYNC_INCREMENT_REQUEST',
  ASYNC_INCREMENT_SUCCESSED: '@@COUNTER/ASYNC_INCREMENT_SUCCESSED',
  ASYNC_INCREMENT_FAILED: '@@COUNTER/ASYNC_INCREMENT_FAILED',
} as const);
export const types = Object.freeze({ ...actionTypes, ...sagaTypes });

export const reset = createStandardAction(types.RESET)();
export const increment = createStandardAction(types.INCREMENT).map(() => ({ payload: { count: 1 } }));
export const decrement = createStandardAction(types.DECREMENT).map(() => ({ payload: { count: -1 } }));
export const add = createStandardAction(types.ADD).map(({ count }: { count: number }) => ({ payload: { count } }));

/*
 * async actions
 */
export type AsyncIncrementRequestAction = {
  type: typeof sagaTypes.ASYNC_INCREMENT_REQUEST;
  payload: { count: number; callingFailed?: boolean };
};
export const asyncIncrement = createAsyncAction(
  sagaTypes.ASYNC_INCREMENT_REQUEST,
  sagaTypes.ASYNC_INCREMENT_SUCCESSED,
  sagaTypes.ASYNC_INCREMENT_FAILED,
)<PickUp<AsyncIncrementRequestAction, 'payload'>, { count: number }, { message: Error }>();
