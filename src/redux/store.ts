import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import { reducer as rootReducer, initialState, saga } from '.';

const bindMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};

export function configureStore(state = initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const bindedMiddleware = bindMiddleware([sagaMiddleware]);
  const store: Store & { sagaTask: Task } = {
    ...createStore(rootReducer, state, bindedMiddleware),
    sagaTask: sagaMiddleware.run(saga),
  };

  return store;
}
