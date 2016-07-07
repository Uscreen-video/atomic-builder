import { createReducer } from 'redux-act';
import * as actions from './actions';

const initialState = [];

export default createReducer({
  [actions.createBlock]: (s) => ({ ...s }),
}, initialState);
