import { createStandardAction, ActionType } from 'typesafe-actions';

import { types } from './types';

export const actions = {
  start: createStandardAction(types.LOADING_START).map(() => ({ payload: { isLoading: true } })),
  end: createStandardAction(types.LOADING_END).map(() => ({ payload: { isLoading: false } })),
  asyncWriteMessage: createStandardAction(types.ASYNC_WRITE_MESSAGE).map(({ message }: { message: string }) => ({
    payload: { message },
  })),
};

export type Action = ActionType<typeof actions>;
