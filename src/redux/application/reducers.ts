/* eslint-disable no-param-reassign */
import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { actions, Action } from './actions';
import { State } from './types';

export const initialState: State = { isLoading: false };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.start, (state, action) =>
    produce(state, draft => {
      draft.isLoading = action.payload.isLoading;
    }),
  )
  .handleAction(actions.end, (state, action) =>
    produce(state, draft => {
      draft.isLoading = action.payload.isLoading;
    }),
  );
