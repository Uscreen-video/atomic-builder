import { createReducer } from 'redux-act';
import * as actions from './actions';

const initialState = {
  keys: [1],
  1: {
    id: 1,
    block: 'HeaderBlock',
    props: {
      title: 'CREATIVE PROFESSIONAL',
      subtitle: 'Lorem ipsum dolor sit amet, natum bonorum expetendis usu ut. Eum impetus offendit disputationi eu, at vim aliquip lucilius praesent. Alia laudem antiopam te ius, sed ad munere integre, ubique facete sapientem nam ut.'
    }
  }
};

export default createReducer({
  [actions.createBlock]: (s) => ({ ...s }),
}, initialState);
