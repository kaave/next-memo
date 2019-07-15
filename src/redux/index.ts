import { combineReducers, Store, Dispatch } from 'redux';
import { all, call } from 'redux-saga/effects';

import * as Application from './application';
import * as UI from './ui';
import * as Domain from './domain';

export type Action = Domain.Action & Application.Action & UI.Action;
export type Dispatch = Dispatch<Action>;
export type RootState = {
  domain: Domain.State;
  application: Application.State;
  ui: UI.State;
};
export type Store = Store<RootState, Action>;
export const initialState: RootState = {
  domain: Domain.initialState,
  application: Application.initialState,
  ui: UI.initialState,
};
export const actions = { domain: Domain.actions, application: Application.actions, ui: UI.actions };
export const reducer = combineReducers({ domain: Domain.reducer, application: Application.reducer, ui: UI.reducer });
export function* saga() {
  yield all([call(Domain.saga)]);
}
export const selectors = {
  domain: Domain.selectors,
};
