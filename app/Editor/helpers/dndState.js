import UUID from 'uuid-js';
import { compose, withState, withProps } from 'recompose';
import { fromJS, List } from 'immutable';

function createId() {
  return UUID.create().toString();
}

export default (type, key = type, shouldCommit = true) => compose(
  withState(type, 'update', props =>
    props[key] instanceof List
    && props[key].get(type) || List([]) // eslint-disable-line new-cap
    || fromJS(props[key])
  ),

  withProps(({ update, updateEditor, ...props }) => {
    const state = props[type];
    return {
      move(index, movedIndex) {
        const mutation = state.delete(movedIndex).insert(index, state.get(movedIndex));
        update(mutation, shouldCommit && updateEditor(type, mutation));
      },
      add(index, data) {
        const mutation = state.insert(index, data.set('id', createId()));
        update(mutation, shouldCommit && updateEditor(type, mutation));
      },
      remove(index) {
        const mutation = state.delete(index);
        update(mutation, shouldCommit && updateEditor(type, mutation));
      }
    };
  })
);
