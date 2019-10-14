/* eslint-disable no-param-reassign */
import { createReducer } from 'typesafe-actions';

import { actions, Action } from './actions';
import { State } from './types';

export const initialState: State = { isLoading: false, message: 'initial message' };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.start, (state, action) => ({ ...state, isLoading: action.payload.isLoading }))
  .handleAction(actions.end, (state, action) => ({ ...state, isLoading: action.payload.isLoading }))
  .handleAction(actions.asyncWriteMessage, (state, action) => ({ ...state, message: action.payload.message }));
