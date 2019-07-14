import { all, call, put, takeEvery } from 'redux-saga/effects';

import { AsyncIncrementRequestAction } from './actions';
import { sagaTypes } from './types';

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));
const getDummyCount = async (n: number) => n * 10;

function* fetchCount(action: AsyncIncrementRequestAction) {
  try {
    console.log(action);
    if (action.payload.callingFailed) {
      throw new Error('callingFailed');
    }
    yield wait(1000);
    const dummyCount = yield call(getDummyCount, action.payload.count);
    yield put({ type: sagaTypes.ASYNC_INCREMENT_SUCCESSED, payload: { count: dummyCount } });
  } catch (e) {
    yield put({ type: sagaTypes.ASYNC_INCREMENT_FAILED, payload: { message: e }, error: true });
  }
}

export function* saga() {
  // combine sagas
  yield all([takeEvery(sagaTypes.ASYNC_INCREMENT_REQUEST, fetchCount)]);
  // この場合、処理がかぶったら最後の1回だけ動く
  // yield takeLatest(sagaTypes.ASYNC_INCREMENT_REQUEST, fetchUser);
}
