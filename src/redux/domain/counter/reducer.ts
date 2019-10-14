/* eslint-disable no-param-reassign */
import { createReducer } from 'typesafe-actions';

import { actions, Action } from './actions';
import { State } from './types';

export const initialState: State = { count: 0, execRequest: false };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.reset, state => ({ ...state, count: 0 }))
  .handleAction(actions.increment, state => ({ ...state, count: state.count + 1 }))
  .handleAction(actions.decrement, state => ({ ...state, count: state.count - 1 }))
  .handleAction(actions.add, (state, action) => ({ ...state, count: state.count + action.payload.count }))
  .handleAction(actions.asyncIncrementRequest, state => ({ ...state, execRequest: true }))
  .handleAction(actions.asyncIncrementSuccess, (state, action) => ({
    ...state,
    count: state.count + action.payload.count,
    execRequest: false,
  }))
  .handleAction(actions.asyncIncrementFailure, state => ({ ...state, execRequest: false }));
