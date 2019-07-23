import { combineReducers } from 'redux';
// import { all, call } from 'redux-saga/effects';

import * as Counter from './counter';

export type Action = Counter.Action;
export type State = {
  counter: Counter.State;
};
export const initialState: State = {
  counter: Counter.initialState,
};
export const actions = { counter: Counter.actions };
export const reducer = combineReducers({ counter: Counter.reducer });
export const selectors = {
  counter: Counter.selectors,
};
export const operators = {
  counter: Counter.operators,
};
