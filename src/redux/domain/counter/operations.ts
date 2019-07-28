import { Dispatch } from 'redux';

import { actions } from './actions';
import { RootState } from '../..';

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export const operations = {
  asyncIncrementRequest: () => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    console.log(state);
    dispatch(actions.asyncIncrementRequest());
    await wait(500);
    dispatch(actions.asyncIncrementSuccess({ count: 1111 }));
  },
};
