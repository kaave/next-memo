import { combineReducers, Store, Dispatch } from 'redux';

import * as Counter from './counter';

export type Action = Counter.Action;
// export type Action = Counter.Action & Foo.Action;
export type Dispatch = Dispatch<Action>;
export type RootState = {
  counter: Counter.State;
};
export type Store = Store<RootState, Action>;
export const initialState = { counter: Counter.initialState };
export const actions = { counter: Counter.actions };
export const reducer = combineReducers<RootState>({ counter: Counter.reducer });
// export const saga = { ...Clock.saga };
// export function* saga() {
//   yield all([...Counts.map(method => method())]);
// }

// export function* rootSaga() {
//   yield all([call(runClockSaga), takeLatest(actionTypes.LOAD_DATA, loadDataSaga)]);
// }
