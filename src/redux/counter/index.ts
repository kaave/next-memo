import * as Actions from './actions';
import * as Reducer from './reducer';

export type Action = Reducer.Action;
export type State = Reducer.State;

const { add, increment, decrement, reset } = Actions;
export const actions = { add, increment, decrement, reset };
export const { reducer, initialState } = Reducer;
