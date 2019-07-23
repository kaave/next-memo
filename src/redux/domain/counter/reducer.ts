/* eslint-disable no-param-reassign */
import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { actions, Action } from './actions';
import { State } from './types';

export const initialState: State = { count: 0, execRequest: false };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.reset, state =>
    produce(state, draftState => {
      draftState.count = 0;
    }),
  )
  .handleAction(actions.increment, state =>
    produce(state, draftState => {
      draftState.count += 1;
    }),
  )
  .handleAction(actions.decrement, state =>
    produce(state, draftState => {
      draftState.count -= 1;
    }),
  )
  .handleAction(actions.add, (state, action) =>
    produce(state, draftState => {
      draftState.count += action.payload.count;
    }),
  )
  .handleAction(actions.asyncIncrementRequest, state =>
    produce(state, draftState => {
      draftState.execRequest = true;
    }),
  )
  .handleAction(actions.asyncIncrementSuccess, (state, action) =>
    produce(state, draftState => {
      draftState.count += action.payload.count;
      draftState.execRequest = false;
    }),
  )
  .handleAction(actions.asyncIncrementFailure, state =>
    produce(state, draftState => {
      draftState.execRequest = false;
    }),
  );
