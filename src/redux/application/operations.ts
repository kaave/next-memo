// sample: https://github.com/alexnm/re-ducks/blob/master/example-duck/operations.js
import { Dispatch } from 'redux';

import { actions } from './actions';

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export const operations = {
  asyncWriteMessage: ({ message }: { message: string }) => async (dispatch: Dispatch) => {
    await wait(500);
    dispatch(actions.asyncWriteMessage({ message }));
  },
};
