/* eslint-disable no-param-reassign */
import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { actions, Action } from './actions';
import { State } from './types';

export const initialState: State = { showModal: false };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.showModal, (state, action) =>
    produce(state, draft => {
      draft.showModal = action.payload.showModal;
    }),
  )
  .handleAction(actions.hideModal, (state, action) =>
    produce(state, draft => {
      draft.showModal = action.payload.showModal;
    }),
  );
