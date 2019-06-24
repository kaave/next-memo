import { createStandardAction } from 'typesafe-actions';

export const types = Object.freeze({
  RESET: '@@COUNTER/RESET',
  INCREMENT: '@@COUNTER/INCREMENT',
  DECREMENT: '@@COUNTER/DECREMENT',
  ADD: '@@COUNTER/ADD',
} as const);

export const reset = createStandardAction(types.RESET)();
export const increment = createStandardAction(types.INCREMENT).map(() => ({ payload: { count: 1 } }));
export const decrement = createStandardAction(types.DECREMENT).map(() => ({ payload: { count: -1 } }));
export const add = createStandardAction(types.ADD).map(({ count }: { count: number }) => ({ payload: { count } }));
