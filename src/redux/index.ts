import { combineReducers, Store, Dispatch, ReducersMapObject } from 'redux';
import { all, call } from 'redux-saga/effects';

import * as Counter from './counter';

export type Action = Counter.Action;
// export type Action = Counter.Action & Foo.Action;
export type Dispatch = Dispatch<Action>;
export type RootState = {
  counter: Counter.State;
};
export type Store = Store<RootState, Action>;
export const initialState: RootState = { counter: Counter.initialState };
export const actions = { counter: Counter.actions };
export const reducer = combineReducers({ counter: Counter.reducer });
export function* saga() {
  yield all([call(Counter.saga)]);
}
