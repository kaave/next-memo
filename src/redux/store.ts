import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as rootReducer, initialState } from '.';

const bindMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};

export function configureStore(state = initialState) {
  const bindedMiddleware = bindMiddleware([]);
  const store: Store = {
    ...createStore(rootReducer, state, bindedMiddleware),
  };

  return store;
}
