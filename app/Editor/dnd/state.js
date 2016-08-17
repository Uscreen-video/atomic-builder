import UUID from 'uuid-js';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
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

  lifecycle({
    componentWillReceiveProps(next) {
      if (!next[key].get) return;

      const entityInStore = next[key].get(type)
      if (type === 'atoms'
        && entityInStore
        && !entityInStore.equals(this.props[type])
      ) {
        this.props.update(entityInStore);
      }
    }
  }),

  withState('hoverIndex', 'hover', void 0),

  withHandlers({
    move: ({ update, updateEditor, ...props }) => (index, movedIndex) => {
      const mutation = props[type].delete(movedIndex).insert(index, props[type].get(movedIndex));
      console.log(`[${type}] Move:`, mutation.toJS());
      update(mutation, shouldCommit && updateEditor(type, mutation));
    },
    add: ({ update, updateEditor, ...props }) => (index, data) => {
      console.log('DROP', props[type].toJS())
      const mutation = props[type].insert(index, data.set('id', createId()));
      console.log(`[${type}] Add:`, mutation.toJS());
      update(mutation, shouldCommit && updateEditor(type, mutation));
    },
    append: ({ update, updateEditor, ...props }) => (data) => {
      const mutation = props[type].push(data.set('id', createId()));
      console.log(`[${type}] Append:`, mutation.toJS());
      update(mutation, shouldCommit && updateEditor(type, mutation));
    },
    remove: ({ update, updateEditor, ...props }) => (index) => {
      const mutation = props[type].delete(index);
      console.log(`[${type}] Remove:`, mutation.toJS());
      update(mutation, shouldCommit && updateEditor(type, mutation));
    },
  }),
);
