import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type Action = ActionType<typeof actions>;
export type State = { count: number };

export const initialState: State = { count: 0 };

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case actions.types.RESET:
      return { ...state, count: 0 };
    case actions.types.INCREMENT:
      return { ...state, count: state.count + 1 };
    case actions.types.DECREMENT:
      return { ...state, count: state.count - 1 };
    case actions.types.ADD:
      return { ...state, count: state.count + action.payload.count };
    default:
      return state;
  }
};
