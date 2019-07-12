/* eslint-disable no-param-reassign */
import { ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';

import * as actions from './actions';

export type Action = ActionType<typeof actions>;
export type State = { count: number; execRequest: boolean };

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
  .handleAction(actions.asyncIncrement.request, state =>
    produce(state, draftState => {
      draftState.execRequest = true;
    }),
  )
  .handleAction(actions.asyncIncrement.success, (state, action) =>
    produce(state, draftState => {
      draftState.count += action.payload.count;
      draftState.execRequest = false;
    }),
  )
  .handleAction(actions.asyncIncrement.failure, state =>
    produce(state, draftState => {
      draftState.execRequest = false;
    }),
  );
