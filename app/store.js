/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}) {
  const middlewares = [];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  // Extensions
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
