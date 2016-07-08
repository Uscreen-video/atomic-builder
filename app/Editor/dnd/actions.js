import UUID from 'uuid-js';
import { compose, withState, withProps } from 'recompose';
import { fromJS, List } from 'immutable';

function createId() {
  return UUID.create().toString();
}

export default (type, key = type) => compose(
  withState(type, 'update', props =>
    props[key] instanceof List
    && props[key].get(type) || List([]) // eslint-disable-line new-cap
    || fromJS(props[key])
  ),

  withProps(({ update, ...props }) => {
    const state = props[type];
    return {
      move(index, movedIndex) {
        update(state.delete(movedIndex).insert(index, state.get(movedIndex)));
      },
      add(index, data) {
        update(state.insert(index, data.set('id', createId())));
      },
      remove(index) {
        update(state.delete(index));
      }
    };
  })
);
