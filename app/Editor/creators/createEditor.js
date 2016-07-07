import {
  compose, withReducer, withHandlers,
  withPropsOnChange, createEagerElement
} from 'recompose';
import { createReducer, createAction } from 'redux-act';
import { DropTarget as target } from 'react-dnd';
import UUID from 'uuid-js';
import { fromJS } from 'immutable';

import * as organisms from 'Atomic/Organisms';

import { template as targetSpec } from '../dnd/dragTarget';
import EditorWrap from '../components/EditorWrap';

const initialState = props => fromJS(props.data);

const addItem = createAction('template:addMolecule', (index, data) =>
  ({ index, data: data.set('id', UUID.create().toString()) })
);

const moveItem = createAction('template:moveMolecule', (index, movedIndex) =>
  ({ index, movedIndex })
);

const removeItem = createAction('template:removeMolecule', (index) =>
  ({ index })
);

const reducer = createReducer({
  [addItem]: (s, { index, data }) => s.insert(index, data),
  [moveItem]: (s, { index, movedIndex }) => s.delete(movedIndex).insert(index, s.get(movedIndex)),
  [removeItem]: (s, { index }) => s.delete(index)
});

export default () =>
compose(
  withReducer('organisms', 'updateTemplate', reducer, initialState),

  withHandlers({
    moveMolecule: props => (index, movedIndex) =>
      props.updateTemplate(moveItem(index, movedIndex)),
    addMolecule: props => (index, data) =>
      props.updateTemplate(addItem(index, data)),
    removeMolecule: props => (index) =>
      props.updateTemplate(removeItem(index))
  }),

  withPropsOnChange(['organisms'], props => ({
    children: props.organisms.map((organism, index) =>
      createEagerElement(
        organisms[organism.get('type')].Component,
        { key: index, organism }
      )
    )
  })),

  target('organism', targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
)(EditorWrap);
