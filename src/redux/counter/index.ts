import * as Actions from './actions';
import * as Reducer from './reducer';

export { saga } from './sagas';

export type Action = Reducer.Action;
export type State = Reducer.State;

const { add, increment, decrement, reset, asyncIncrement } = Actions;
export const actions = { add, increment, decrement, reset, asyncIncrement };
export const { reducer, initialState } = Reducer;
