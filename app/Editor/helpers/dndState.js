import UUID from 'uuid-js';
import { compose, withState, withHandlers, getContext } from 'recompose';
import { fromJS, List } from 'immutable';
import { PropTypes } from 'react';

const { func } = PropTypes;

function createId() {
  return UUID.create().toString();
}

export default (type, key = type, shouldCommit = true) => compose(
  getContext({ drag: func, drop: func }),

  withState(type, 'update', props =>
    props[key] instanceof List
    && props[key].get(type) || List([]) // eslint-disable-line new-cap
    || fromJS(props[key])
  ),

  withHandlers({
    move: ({ update, updateEditor, ...props }) => (index, movedIndex) => {
      const mutation = props[type].delete(movedIndex).insert(index, props[type].get(movedIndex));
      console.log(`[${type}] Move:`, mutation);
      update(mutation, shouldCommit && updateEditor(type, mutation));
    },
    add: ({ update, updateEditor, ...props }) => (index, data) => {
      const mutation = props[type].insert(index, data.set('id', createId()));
      console.log(`[${type}] Add:`, mutation);
      update(mutation, shouldCommit && updateEditor(type, mutation));
    },
    remove: ({ update, updateEditor, ...props }) => (index) => {
      const mutation = props[type].delete(index);
      update(mutation, shouldCommit && updateEditor(type, mutation));
    }
  })
);
