import { ActionType, createReducer } from 'typesafe-actions';

import * as actions from './actions';

export type Action = ActionType<typeof actions>;
export type State = { count: number; execRequest: boolean };

export const initialState: State = { count: 0, execRequest: false };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.reset, state => ({ ...state, count: 0 }))
  .handleAction(actions.increment, state => ({ ...state, count: state.count + 1 }))
  .handleAction(actions.decrement, state => ({ ...state, count: state.count - 1 }))
  .handleAction(actions.add, (state, action) => ({ ...state, count: state.count + action.payload.count }))
  .handleAction(actions.asyncIncrement.request, state => ({ ...state, execRequest: true }))
  .handleAction(actions.asyncIncrement.success, (state, action) => ({
    ...state,
    count: state.count + action.payload.count,
    execRequest: false,
  }))
  .handleAction(actions.asyncIncrement.failure, state => ({ ...state, execRequest: false }));
