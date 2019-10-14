/* eslint-disable no-param-reassign */
import { createReducer } from 'typesafe-actions';

import { actions, Action } from './actions';
import { State } from './types';

export const initialState: State = { showModal: false };

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(actions.showModal, (state, action) => ({ ...state, showModal: action.payload.showModal }))
  .handleAction(actions.hideModal, (state, action) => ({ ...state, showModal: action.payload.showModal }));
