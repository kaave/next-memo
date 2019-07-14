import { createStandardAction, ActionType } from 'typesafe-actions';

import { types } from './types';

export const actions = {
  showModal: createStandardAction(types.SHOW_MODAL).map(() => ({ payload: { showModal: true } })),
  hideModal: createStandardAction(types.HIDE_MODAL).map(() => ({ payload: { showModal: false } })),
};

export type Action = ActionType<typeof actions>;
