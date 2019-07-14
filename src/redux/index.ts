import { combineReducers, Store, Dispatch } from 'redux';
import { all, call } from 'redux-saga/effects';

import * as Application from './application';
import * as UI from './ui';
import * as Counter from './counter';

export type Action = Counter.Action & Application.Action & UI.Action;
export type Dispatch = Dispatch<Action>;
export type RootState = {
  counter: Counter.State;
  application: Application.State;
  ui: UI.State;
};
export type Store = Store<RootState, Action>;
export const initialState: RootState = {
  counter: Counter.initialState,
  application: Application.initialState,
  ui: UI.initialState,
};
export const actions = { counter: Counter.actions, application: Application.actions, ui: UI.actions };
export const reducer = combineReducers({ counter: Counter.reducer, application: Application.reducer, ui: UI.reducer });
export function* saga() {
  yield all([call(Counter.saga)]);
}
